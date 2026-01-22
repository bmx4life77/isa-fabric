// src/core/adversarial/sensitivity-sweeper.ts

import { SensitivitySweepResult } from "./types";

export function runSensitivitySweeps(
  rasuv: any,
  sweeps: number = 3
): SensitivitySweepResult[] {
  const params = ["R", "A", "S", "U", "V"];
  const results: SensitivitySweepResult[] = [];

  for (const p of params) {
    const deltas: number[] = [];
    const impacts: number[] = [];

    for (let i = 0; i < sweeps; i++) {
      const varied = { ...rasuv };
      const delta = (Math.random() * 0.1 - 0.05); // ±5%
      varied[p] = Math.min(Math.max(rasuv[p] + delta, 0), 1);

      const impact =
        (1 - varied.S) * 0.4 +
        (1 - varied.U) * 0.3 +
        (1 - varied.V) * 0.3;

      deltas.push(delta);
      impacts.push(impact);
    }

    results.push({
      parameter: p,
      deltas,
      impacts,
    });
  }

  return results;
}
