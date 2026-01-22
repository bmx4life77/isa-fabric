// src/benchmarking/metrics.ts
import type { Dataset } from "./schema";
import { LensResult } from "../lenses/types";

export type LensScores = {
  beta: number;   // β
  vu: number;     // VU
  iota: number;   // ι
  phi: number;    // φ
  psi5: number;   // ψ₅
};

function normalize(value: number, max: number): number {
  if (max === 0) return 0;
  const v = value / max;
  return Math.min(1, Math.max(0, v));
}

export function computeLensScores(dataset: Dataset): LensScores {
  const values = dataset.points.map(p => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;

  // crude variance
  const variance =
    values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
    values.length;

  // MVP placeholders — real math can replace these later
  const beta = normalize(mean, max);          // “efficiency”
  const vu = normalize(max - mean, max);      // “vulnerability/utilization”
  const iota = 1 - normalize(variance, max);  // “resilience”
  const phi = 1 - normalize(max - min, max);  // “clarity/integration”
  const psi5 = normalize(mean + variance, max * 2); // “security posture”

  return { beta, vu, iota, phi, psi5 };
}
