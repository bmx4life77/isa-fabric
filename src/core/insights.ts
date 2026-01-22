export function generateInsights(envelope: any, scores: any) {
  const m = envelope.metrics || {};
  const psi5 = m.psi5 || {};
  const beta = m.beta || {};
  const phi = m.phi || {};

  return {
    availability: availabilityInsights(psi5, beta, phi, scores.availability),
    performance: performanceInsights(beta, phi, scores.performance),
    resilience: resilienceInsights(psi5, phi, scores.resilience),
    security: securityInsights(psi5, phi, scores.security)
  };
}

function availabilityInsights(psi5: any, beta: any, phi: any, score: number) {
  const drivers = [];
  const stressors = [];

  if ((psi5.mitigation_effectiveness ?? 0) > 0.7)
    drivers.push("High mitigation effectiveness");
  if ((phi.absorption_resilience ?? 0) > 0.7)
    drivers.push("Strong absorption resilience");

  if ((beta.latency_impact ?? 0) > 0.3)
    stressors.push("Elevated latency impact");
  if ((beta.error_rate_impact ?? 0) > 0.2)
    stressors.push("Increased error rate impact");
  if ((psi5.attack_pressure ?? 0) > 0.6)
    stressors.push("High adversarial pressure");

  const balance =
    score > 0.7
      ? "Availability remained strong under current conditions."
      : score > 0.5
      ? "Availability held but showed signs of strain."
      : "Availability was significantly impacted by system stressors.";

  const trajectory =
    (psi5.attack_pressure ?? 0) > 0.7
      ? "Strained"
      : "Stable";

  return { drivers, stressors, balance, trajectory };
}

function performanceInsights(beta: any, phi: any, score: number) {
  const drivers = [];
  const stressors = [];

  if ((beta.latency_impact ?? 0) < 0.2)
    drivers.push("Low latency impact");
  if ((beta.error_rate_impact ?? 0) < 0.1)
    drivers.push("Minimal error rate impact");
  if ((phi.recovery_speed ?? 0) > 0.7)
    drivers.push("Fast recovery speed");

  if ((beta.latency_impact ?? 0) > 0.4)
    stressors.push("High latency impact");
  if ((beta.error_rate_impact ?? 0) > 0.3)
    stressors.push("Elevated error rates");

  const balance =
    score > 0.8
      ? "Performance remained smooth and responsive."
      : score > 0.6
      ? "Performance was generally stable with minor degradation."
      : "Performance was noticeably impacted.";

  const trajectory =
    (beta.latency_impact ?? 0) > 0.4
      ? "Degrading"
      : "Stable";

  return { drivers, stressors, balance, trajectory };
}

function resilienceInsights(psi5: any, phi: any, score: number) {
  const drivers = [];
  const stressors = [];

  if ((phi.absorption_resilience ?? 0) > 0.7)
    drivers.push("High absorption resilience");
  if ((phi.recovery_speed ?? 0) > 0.7)
    drivers.push("Fast recovery speed");

  if ((psi5.sustained_vs_burst_ratio ?? 0) > 0.6)
    stressors.push("High sustained pressure");
  if ((psi5.attack_pressure ?? 0) > 0.6)
    stressors.push("Elevated adversarial load");

  const balance =
    score > 0.7
      ? "System demonstrated strong resilience under stress."
      : score > 0.5
      ? "System maintained resilience with some strain."
      : "Resilience was significantly challenged.";

  const trajectory =
    (psi5.sustained_vs_burst_ratio ?? 0) > 0.6
      ? "Strained"
      : "Stable";

  return { drivers, stressors, balance, trajectory };
}

function securityInsights(psi5: any, phi: any, score: number) {
  const drivers = [];
  const stressors = [];

  if ((psi5.mitigation_effectiveness ?? 0) > 0.7)
    drivers.push("Strong mitigation effectiveness");
  if ((phi.absorption_resilience ?? 0) > 0.7)
    drivers.push("High absorption resilience");
  if ((phi.recovery_speed ?? 0) > 0.7)
    drivers.push("Fast recovery speed");

  if ((psi5.attack_pressure ?? 0) > 0.6)
    stressors.push("High attack pressure");
  if ((psi5.botnet_activity ?? 0) > 0.6)
    stressors.push("Elevated botnet activity");
  if ((psi5.anomaly_frequency ?? 0) > 0.5)
    stressors.push("Frequent anomalies detected");

  const balance =
    score > 0.7
      ? "Defensive posture is clearly stronger than threat pressure."
      : score > 0.5
      ? "Defense is holding but under noticeable strain."
      : "Threat pressure is overwhelming defensive posture.";

  const trajectory =
    (psi5.attack_pressure ?? 0) > 0.7
      ? "Strained"
      : "Stable";

  return { drivers, stressors, balance, trajectory };
}
