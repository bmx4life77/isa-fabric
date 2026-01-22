// src/analytics/volatilityAR1.ts

export function forecastVolatility(
  series: number[],
  lookback: number = 16     // <-- new optional parameter
) {
  if (!series.length) {
    return { sigma: 0, regime: "unknown" };
  }

  const tail = series.slice(-lookback);
  const mean =
    tail.reduce((acc, x) => acc + x, 0) / (tail.length || 1);

  const variance =
    tail.reduce((acc, x) => acc + (x - mean) ** 2, 0) /
    (tail.length - 1 || 1);

  const sigma = Math.sqrt(variance);

  let regime: string;
  if (sigma < 0.015) regime = "calm";
  else if (sigma < 0.03) regime = "elevated";
  else regime = "turbulent";

  return { sigma, regime };
}
