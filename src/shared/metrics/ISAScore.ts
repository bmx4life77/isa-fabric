// src/shared/metrics/ISAScore.ts

export interface IsaWeightConfig {
  throughput: number;   // how much we care about raw throughput
  utilization: number;  // how much we care about vectorization utilization
  security: number;     // reserved for future security posture metric
  stability: number;    // reserved for future temporal stability index
}

export interface IsaScoreInputs {
  throughput: number;         // ops/sec for this executor
  baselineThroughput: number; // max or reference ops/sec in this run
  utilization: number;        // 0..1 vectorization utilization
  securityScore?: number;     // 0..1 (optional for now)
  stabilityScore?: number;    // 0..1 (optional for now)
}

export interface IsaScoreResult {
  raw: number;         // weighted sum in [0, 1]
  normalized: number;  // 0..100 human-friendly score
  breakdown: {
    throughput: number;   // contribution from throughput (0..1)
    utilization: number;  // contribution from utilization (0..1)
    security: number;     // contribution from security (0..1)
    stability: number;    // contribution from temporal stability (0..1)
  };
}

export const defaultIsaWeights: IsaWeightConfig = {
  throughput: 0.4,
  utilization: 0.3,
  security: 0.2,
  stability: 0.1,
};

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

/**
 * Compute an ISA score in [0, 100] for a single executor, given:
 *  - its throughput & a baseline throughput
 *  - its vectorization utilization
 *  - optional security & temporal stability scores (0..1)
 *
 * For now, if security or stability are missing, we treat them as 0.5
 * (neutral) so they don't drag the score down unfairly.
 */
export function computeIsaScore(
  input: IsaScoreInputs,
  weights: IsaWeightConfig = defaultIsaWeights
): IsaScoreResult {
  const {
    throughput,
    baselineThroughput,
    utilization,
    securityScore,
    stabilityScore,
  } = input;

  const safeBaseline =
    baselineThroughput > 0 ? baselineThroughput : Math.max(throughput, 1);

  const throughputNorm = clamp01(throughput / safeBaseline);
  const utilNorm = clamp01(utilization);

  const secNorm =
    securityScore === undefined ? 0.5 : clamp01(securityScore);
  const stabNorm =
    stabilityScore === undefined ? 0.5 : clamp01(stabilityScore);

  const wT = weights.throughput;
  const wU = weights.utilization;
  const wS = weights.security;
  const wSt = weights.stability;

  const totalW = wT + wU + wS + wSt || 1;

  // individual contributions (0..1 scaled by their relative weight share)
  const contribThroughput = (wT / totalW) * throughputNorm;
  const contribUtil = (wU / totalW) * utilNorm;
  const contribSec = (wS / totalW) * secNorm;
  const contribStab = (wSt / totalW) * stabNorm;

  const raw =
    contribThroughput + contribUtil + contribSec + contribStab;

  return {
    raw,
    normalized: Number((raw * 100).toFixed(2)), // 0..100
    breakdown: {
      throughput: contribThroughput,
      utilization: contribUtil,
      security: contribSec,
      stability: contribStab,
    },
  };
}
