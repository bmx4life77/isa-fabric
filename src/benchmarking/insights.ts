// src/benchmarking/insights.ts
import type { LensScores } from "./metrics";

export function generateInsights(scores: LensScores): string[] {
  const messages: string[] = [];

  if (scores.beta > 0.8) {
    messages.push("System shows high efficiency (β).");
  } else if (scores.beta < 0.4) {
    messages.push("System efficiency (β) appears low; investigate bottlenecks.");
  }

  if (scores.vu > 0.7) {
    messages.push("High vulnerability/utilization (VU); attack surface may be significant.");
  }

  if (scores.iota < 0.5) {
    messages.push("Resilience (ι) is weak; recovery and stability may be at risk.");
  }

  if (scores.phi < 0.5) {
    messages.push("Clarity/integration (φ) is low; documentation or integration may be fragmented.");
  }

  if (scores.psi5 < 0.5) {
    messages.push("Security posture (ψ₅) appears weak; additional controls are recommended.");
  } else if (scores.psi5 > 0.8) {
    messages.push("Security posture (ψ₅) appears strong.");
  }

  if (messages.length === 0) {
    messages.push("System appears balanced across lenses with no major anomalies detected.");
  }

  return messages;
}
