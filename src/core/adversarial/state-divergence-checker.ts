// src/core/adversarial/state-divergence-checker.ts

export function checkStateDivergence(
  divergenceScore: number
): string {
  if (divergenceScore > 0.75) return "Critical divergence";
  if (divergenceScore > 0.50) return "High divergence";
  if (divergenceScore > 0.25) return "Moderate divergence";
  return "Low divergence";
}
