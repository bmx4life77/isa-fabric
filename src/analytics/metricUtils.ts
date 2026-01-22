
export interface TimeSeries {
  name: string;
  values: number[];
}

/**
 * Simple moving average.
 */
export function sma(values: number[], window: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < values.length; i++) {
    if (i + 1 < window) {
      out.push(NaN);
      continue;
    }
    const slice = values.slice(i + 1 - window, i + 1);
    const sum = slice.reduce((s, v) => s + v, 0);
    out.push(sum / window);
  }
  return out;
}

/**
 * Exponential moving average.
 */
export function ema(values: number[], window: number): number[] {
  const out: number[] = [];
  const k = 2 / (window + 1);

  let prev: number | undefined = undefined;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (prev === undefined) {
      prev = v;
    } else {
      prev = v * k + prev * (1 - k);
    }
    out.push(prev);
  }
  return out;
}

/**
 * RSI, normalized to [0,1].
 * returns array of same length; leading values may be NaN.
 */
export function rsi(values: number[], window: number): number[] {
  const out: number[] = [];
  let gains: number[] = [];
  let losses: number[] = [];

  for (let i = 0; i < values.length; i++) {
    if (i === 0) {
      out.push(NaN);
      continue;
    }
    const delta = values[i] - values[i - 1];
    gains.push(delta > 0 ? delta : 0);
    losses.push(delta < 0 ? -delta : 0);

    if (gains.length > window) {
      gains.shift();
      losses.shift();
    }

    if (gains.length < window) {
      out.push(NaN);
      continue;
    }

    const avgGain = gains.reduce((s, v) => s + v, 0) / window;
    const avgLoss = losses.reduce((s, v) => s + v, 0) / window;

    if (avgLoss === 0) {
      out.push(1); // max RSI
      continue;
    }

    const rs = avgGain / avgLoss;
    const rsi100 = 100 - 100 / (1 + rs);
    out.push(rsi100 / 100); // normalize to [0,1]
  }

  return out;
}

/**
 * Bollinger Bands: returns { middle, upper, lower } arrays.
 */
export function bollingerBands(
  values: number[],
  window: number,
  stdDev: number
): { middle: number[]; upper: number[]; lower: number[] } {
  const middle = sma(values, window);
  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = 0; i < values.length; i++) {
    if (i + 1 < window) {
      upper.push(NaN);
      lower.push(NaN);
      continue;
    }
    const slice = values.slice(i + 1 - window, i + 1);
    const mean = middle[i];
    const variance =
      slice.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / window;
    const stdev = Math.sqrt(variance);
    upper.push(mean + stdDev * stdev);
    lower.push(mean - stdDev * stdev);
  }

  return { middle, upper, lower };
}

/**
 * MACD: returns MACD line and signal line.
 * typical defaults: fast=12, slow=26, signal=9
 */
export function macd(
  values: number[],
  fast: number,
  slow: number,
  signalWindow: number
): { macdLine: number[]; signalLine: number[] } {
  const fastEma = ema(values, fast);
  const slowEma = ema(values, slow);
  const macdLine = values.map((_, i) => fastEma[i] - slowEma[i]);
  const signalLine = ema(macdLine, signalWindow);
  return { macdLine, signalLine };
}

/**
 * Basic DFT (Discrete Fourier Transform) for small N.
 * Returns magnitude spectrum (no phase for now).
 */
export function dft(values: number[]): number[] {
  const N = values.length;
  const out: number[] = [];
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (-2 * Math.PI * k * n) / N;
      re += values[n] * Math.cos(angle);
      im += values[n] * Math.sin(angle);
    }
    out.push(Math.sqrt(re * re + im * im));
  }
  return out;
}

/**
 * Simple Pearson correlation between two equal-length series.
 */
export function correlation(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Series must have same length");
  }
  const n = a.length;
  const meanA = a.reduce((s, v) => s + v, 0) / n;
  const meanB = b.reduce((s, v) => s + v, 0) / n;

  let num = 0;
  let denA = 0;
  let denB = 0;
  for (let i = 0; i < n; i++) {
    const da = a[i] - meanA;
    const db = b[i] - meanB;
    num += da * db;
    denA += da * da;
    denB += db * db;
  }
  if (denA === 0 || denB === 0) return NaN;
  return num / Math.sqrt(denA * denB);
}
