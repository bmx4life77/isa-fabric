// src/analytics/theta.ts (new file, minimal stub for now)
export interface ThetaResult {
  thetaOpt: number;      // raw theta parameter
}

export function computeTheta(series: number[]): ThetaResult | undefined {
  if (!series.length) return undefined;

  // TODO: replace with real Theta implementation.
  // For now, use a simple proxy: higher variance → higher thetaOpt.
  const mean = series.reduce((a, b) => a + b, 0) / series.length;
  const varSum = series.reduce((acc, x) => acc + (x - mean) ** 2, 0);
  const variance = varSum / series.length;

  const thetaOpt = Math.min(3, 1 + variance); // crude, bounded 1..3
  return { thetaOpt };
}
