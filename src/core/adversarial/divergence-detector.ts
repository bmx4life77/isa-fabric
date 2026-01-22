// src/core/adversarial/divergence-detector.ts

import { DivergenceResult } from "./types";

export function detectDivergence(rasuv: {
  R: number;
  A: number;
  S: number;
  U: number;
  V: number;
}): DivergenceResult {
  const anomalies: string[] = [];
  let score = 0;

  if (rasuv.S < 0.75) {
    anomalies.push("High state surface exposure");
    score += 0.25;
  }
  if (rasuv.U < 0.80) {
    anomalies.push("Low update stability");
    score += 0.20;
  }
  if (rasuv.V < 0.80) {
    anomalies.push("High volatility detected");
    score += 0.20;
  }

  return {
    divergenceScore: Math.min(score, 1),
    anomalies,
  };
}
