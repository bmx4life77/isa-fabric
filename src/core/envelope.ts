// src/core/envelope.ts
export function buildEnvelope(telemetry: any) {
  const psi5 = telemetry.psi5 || {};
  const beta = telemetry.beta || {};
  const phi = telemetry.phi || {};

  const metrics = {
    // Raw psi5 components
    psi5: {
      attack_pressure: psi5.attack_pressure ?? 0,
      mitigation_effectiveness: psi5.mitigation_effectiveness ?? 0,
      anomaly_frequency: psi5.anomaly_frequency ?? 0,
      botnet_activity: psi5.botnet_activity ?? 0,
      sustained_vs_burst_ratio: psi5.sustained_vs_burst_ratio ?? 0
    },

    // Raw beta components
    beta: {
      latency_impact: beta.latency_impact ?? 0,
      error_rate_impact: beta.error_rate_impact ?? 0
    },

    // Raw phi components
    phi: {
      absorption_resilience: phi.absorption_resilience ?? 0,
      recovery_speed: phi.recovery_speed ?? 0
    }
  };

  return {
    metadata: {
      source: telemetry.source || "cloudflare_ddos_daily",
      timestamp: telemetry.timestamp || Date.now(),
      version: "1.0.0"
    },
    metrics,
    raw: telemetry
  };
}
