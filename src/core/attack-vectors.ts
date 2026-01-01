// src/core/adversarial/attack-vectors.ts

import { AttackVectorResult } from "./types";

export function simulateAttackVectors(
  vectors: string[] = [],
  psi5: number = 0.9
): AttackVectorResult[] {
  return vectors.map((v) => {
    const baseImpact = v.includes("reentrancy")
      ? 0.35
      : v.includes("overflow")
      ? 0.25
      : 0.15;

    const mitigated = baseImpact * (1 - psi5);

    return {
      vector: v,
      impact: Math.max(mitigated, 0),
      notes: `Mitigated by ψ₅=${psi5.toFixed(2)}`,
    };
  });
}
