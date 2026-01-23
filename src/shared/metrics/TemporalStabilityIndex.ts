// src/shared/metrics/TemporalStabilityIndex.ts
//
// Temporal Stability Index (Ξ) — how stable is performance over time?
// Ξ ≈ 1.0 → rock-solid; Ξ → 0.0 → highly chaotic.

export interface XiInput {
  performanceSamples: number[];   // e.g., throughput measurements over time
  varianceThreshold?: number;     // how tolerant we are (default 0.15 = 15%)
}

export interface XiResult {
  xi: number;          // 0..1
  unstable: boolean;   // below threshold?
  sampleCount: number;
  mean: number;
  stdev: number;
}

export class XiCalculator {
  static compute(input: XiInput): XiResult {
    const samples = (input.performanceSamples || []).filter((x) =>
      Number.isFinite(x)
    );

    if (samples.length === 0) {
      return { xi: 0, unstable: true, sampleCount: 0, mean: 0, stdev: 0 };
    }

    const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
    if (mean === 0) {
      return { xi: 0, unstable: true, sampleCount: samples.length, mean: 0, stdev: 0 };
    }

    const variance =
      samples.reduce((acc, v) => acc + (v - mean) * (v - mean), 0) /
      samples.length;
    const stdev = Math.sqrt(variance);

    const threshold = input.varianceThreshold ?? 0.15; // 15% of mean
    const normalized = stdev / (mean * threshold);     // >1 = bad, <1 = good
    const xi = clamp01(1 - normalized);

    return {
      xi,
      unstable: xi < 0.5,
      sampleCount: samples.length,
      mean,
      stdev,
    };
  }
}

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}
