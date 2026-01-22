// src/analytics/waveletEnvelope.ts

export interface WaveletEnvelope {
  lowBand: number[];       // smoothed trend
  midBand: number[];       // deviation from lowBand
  ridgeIndices: number[];  // indices with elevated midBand magnitude
  energy: number;          // average squared midBand amplitude
}

/**
 * Simple moving average smoother.
 */
function smooth(series: number[], window: number): number[] {
  const n = series.length;
  if (n === 0) return [];
  const out = new Array<number>(n).fill(0);
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += series[i];
    if (i >= window) {
      sum -= series[i - window];
    }
    const denom = i + 1 < window ? i + 1 : window;
    out[i] = sum / denom;
  }

  return out;
}

/**
 * Very lightweight multi-scale "wavelet-like" envelope:
 *  - lowBand: smoothed series (trend)
 *  - midBand: original - lowBand (local tension)
 *  - ridgeIndices: where |midBand| exceeds a relative threshold
 *  - energy: average midBand^2
 */
export function computeWaveletEnvelope(
  series: number[],
  window: number = 5,
  ridgeThresholdRatio: number = 0.5
): WaveletEnvelope {
  const n = series.length;
  if (n === 0) {
    return {
      lowBand: [],
      midBand: [],
      ridgeIndices: [],
      energy: 0,
    };
  }

  const lowBand = smooth(series, window);
  const midBand = series.map((x, i) => x - lowBand[i]);

  let energyAcc = 0;
  let maxAbs = 0;

  for (let i = 0; i < n; i++) {
    const v = midBand[i];
    energyAcc += v * v;
    const abs = Math.abs(v);
    if (abs > maxAbs) maxAbs = abs;
  }

  const energy = energyAcc / n;
  const ridgeThreshold = ridgeThresholdRatio * maxAbs;

  const ridgeIndices: number[] = [];
  for (let i = 0; i < n; i++) {
    if (Math.abs(midBand[i]) >= ridgeThreshold) {
      ridgeIndices.push(i);
    }
  }

  return {
    lowBand,
    midBand,
    ridgeIndices,
    energy,
  };
}
