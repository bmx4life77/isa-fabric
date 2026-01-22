// ---------------------------------------------
// Weighted Composite Types & Defaults
// ---------------------------------------------
export type ScoreWeights = {
  availability: number;
  performance: number;
  resilience: number;
  security: number;
};

export const defaultWeights: ScoreWeights = {
  availability: 0.25,
  performance: 0.25,
  resilience: 0.25,
  security: 0.25
};

// ---------------------------------------------
// Main Scoring Function
// ---------------------------------------------
export function computeScores(
  envelope: any,
  weights: ScoreWeights = defaultWeights
) {
  const m = envelope.metrics || {};
  const psi5 = m.psi5 || {};
  const beta = m.beta || {};
  const phi = m.phi || {};

  const availability =
    normalize(
      0.35 * (psi5.mitigation_effectiveness ?? 0) +
      0.35 * (phi.absorption_resilience ?? 0) -
      0.15 * (beta.latency_impact ?? 0) -
      0.1  * (beta.error_rate_impact ?? 0) -
      0.05 * (psi5.attack_pressure ?? 0)
    );

  const performance =
    normalize(
      0.55 * (1 - (beta.latency_impact ?? 0)) +
      0.3  * (1 - (beta.error_rate_impact ?? 0)) +
      0.15 * (phi.recovery_speed ?? 0)
    );

  const resilience = computeResilienceScore(psi5, phi);
  const security = computeSecurityScore(psi5, phi);

  // ---------------------------------------------
  // Weighted Composite (NEW)
  // ---------------------------------------------
  const overall = normalize(
    availability * (weights.availability ?? 0) +
    performance  * (weights.performance ?? 0) +
    resilience   * (weights.resilience ?? 0) +
    security     * (weights.security ?? 0)
  );

  return {
    availability,
    performance,
    resilience,
    security,
    overall
  };
}

// ---------------------------------------------
// Security Score
// ---------------------------------------------
function computeSecurityScore(psi5: any, phi: any): number {
  const attackPressure = psi5.attack_pressure ?? 0;
  const botnetActivity = psi5.botnet_activity ?? 0;
  const anomalyFrequency = psi5.anomaly_frequency ?? 0;
  const mitigationEffectiveness = psi5.mitigation_effectiveness ?? 0;

  const absorptionResilience = phi.absorption_resilience ?? 0;
  const recoverySpeed = phi.recovery_speed ?? 0;

  const threatIndex =
    0.4 * attackPressure +
    0.3 * botnetActivity +
    0.3 * anomalyFrequency;

  const defenseIndex =
    0.5 * mitigationEffectiveness +
    0.25 * absorptionResilience +
    0.25 * recoverySpeed;

  if (threatIndex < 0.05 && defenseIndex < 0.05) {
    return 0.7;
  }

  const total = threatIndex + defenseIndex;
  if (total === 0) return 0.5;

  const postureRatio = defenseIndex / total;

  return normalize(postureRatio);
}

// ---------------------------------------------
// Resilience Score
// ---------------------------------------------
function computeResilienceScore(psi5: any, phi: any): number {
  const attackPressure = psi5.attack_pressure ?? 0;
  const mitigationEffectiveness = psi5.mitigation_effectiveness ?? 0;
  const sustainedVsBurst = psi5.sustained_vs_burst_ratio ?? 0;

  const absorptionResilience = phi.absorption_resilience ?? 0;
  const recoverySpeed = phi.recovery_speed ?? 0;

  const sustainedStress = 0.5 * attackPressure + 0.5 * sustainedVsBurst;

  const resilienceRaw =
    0.4 * absorptionResilience +
    0.3 * recoverySpeed +
    0.2 * mitigationEffectiveness -
    0.3 * sustainedStress;

  return normalize(resilienceRaw);
}

// ---------------------------------------------
// Normalization Helper
// ---------------------------------------------
function normalize(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
