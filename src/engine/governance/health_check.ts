/**
 * ISA Fabric — Governance Engine
 * health_check.ts
 *
 * Performs governance health checks.
 */

import { ModulatedOutput } from "../modulation/types";

export function governanceHealthCheck(modulated: ModulatedOutput): string[] {
  const issues: string[] = [];

  if (modulated.drift > 0.2) {
    issues.push("High drift detected");
  }

  if (modulated.volatility > 0.5) {
    issues.push("High volatility detected");
  }

  if (modulated.macroState.drift > 0.2) {
    issues.push("Macro-state drift elevated");
  }

  if (modulated.macroState.volatility > 0.5) {
    issues.push("Macro-state volatility elevated");
  }

  return issues;
}
