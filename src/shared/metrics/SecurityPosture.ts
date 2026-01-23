// src/shared/metrics/SecurityPosture.ts
//
// Lightweight scoring engine for method-level security posture.
//
// This is intentionally simple and transparent so you can
// tune the weights later for ISA Metrics.

export interface SecurityPostureInput {
  reentrancyRisk: number;            // 0..1
  accessControlComplexity: number;   // 0..1
  stateMutationScope: number;        // 0..1
  auditMaturity: number;             // 0..1
}

export type SecurityPostureBand = "HARDENED" | "SECURE" | "REVIEW";

export interface SecurityPostureResult {
  score: number;           // 0..100
  band: SecurityPostureBand;
  components: {
    reentrancyRisk: number;
    accessControlComplexity: number;
    stateMutationScope: number;
    auditMaturity: number;
  };
}

export class SecurityPosture {
  // Simple weighted aggregate. You can tweak these later.
  private static readonly WEIGHTS = {
    reentrancyRisk: 0.30,
    accessControlComplexity: 0.20,
    stateMutationScope: 0.30,
    auditMaturity: 0.20,
  };

  static evaluate(input: SecurityPostureInput): SecurityPostureResult {
    const r = clamp01(1 - input.reentrancyRisk);           // lower risk → higher contribution
    const a = clamp01(1 - input.accessControlComplexity);  // simpler access → better
    const s = clamp01(1 - input.stateMutationScope);       // smaller scope → better
    const m = clamp01(input.auditMaturity);                // more mature audits → better

    const score01 =
      r * this.WEIGHTS.reentrancyRisk +
      a * this.WEIGHTS.accessControlComplexity +
      s * this.WEIGHTS.stateMutationScope +
      m * this.WEIGHTS.auditMaturity;

    const score = Math.round(score01 * 100);

    let band: SecurityPostureBand;
    if (score >= 85) band = "HARDENED";
    else if (score >= 65) band = "SECURE";
    else band = "REVIEW";

    return {
      score,
      band,
      components: {
        reentrancyRisk: r,
        accessControlComplexity: a,
        stateMutationScope: s,
        auditMaturity: m,
      },
    };
  }
}

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}
