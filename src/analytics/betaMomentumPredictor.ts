// src/analytics/betaMomentumPredictor.ts

import { PredictiveConfig } from "./predictiveConfig";

export type MomentumPhase = "bullish" | "bearish" | "neutral";

export interface BetaMomentumSignals {
  slope: number; // simple linear regression slope over full series
  rsi: number;   // 0–1 normalized oscillator
  rsiRegime: "oversold" | "overbought" | "neutral";
  macdLine: number;
  signalLine: number;
  macdPhase: MomentumPhase;
}

function ema(values: number[], period: number): number[] {
  if (values.length === 0) return [];
  const k = 2 / (period + 1);
  const out: number[] = [];
  let prev = values[0];
  out.push(prev);
  for (let i = 1; i < values.length; i++) {
    const v = values[i] * k + prev * (1 - k);
    out.push(v);
    prev = v;
  }
  return out;
}

function computeRsiNormalized(values: number[], window: number): number {
  if (values.length < 2) return 0.5;

  const changes: number[] = [];
  for (let i = 1; i < values.length; i++) {
    changes.push(values[i] - values[i - 1]);
  }

  const n = Math.min(window, changes.length);
  if (n === 0) return 0.5;

  let gains = 0;
  let losses = 0;
  for (let i = changes.length - n; i < changes.length; i++) {
    const c = changes[i];
    if (c > 0) gains += c;
    else losses -= c;
  }

  const avgGain = gains / n;
  const avgLoss = losses / n || 1e-9;
  const rs = avgGain / avgLoss;
  const rsi = 1 - 1 / (1 + rs); // normalized 0–1

  return rsi;
}

function regressionSlope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;

  const xs = Array.from({ length: n }, (_, i) => i);
  const meanX = (n - 1) / 2;
  const meanY =
    values.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = values[i] - meanY;
    num += dx * dy;
    den += dx * dx;
  }

  return den === 0 ? 0 : num / den;
}

/**
 * Computes MACD-style momentum & RSI-style oscillator on beta.
 */
export function analyzeBetaMomentum(
  betaSeries: number[],
  config: PredictiveConfig
): BetaMomentumSignals {
  const n = betaSeries.length;
  if (n === 0) {
    return {
      slope: 0,
      rsi: 0.5,
      rsiRegime: "neutral",
      macdLine: 0,
      signalLine: 0,
      macdPhase: "neutral",
    };
  }

  const slope = regressionSlope(betaSeries);
  const rsi = computeRsiNormalized(betaSeries, config.rsiWindow);

  let rsiRegime: "oversold" | "overbought" | "neutral" = "neutral";
  if (rsi <= config.rsiOversold) rsiRegime = "oversold";
  else if (rsi >= config.rsiOverbought) rsiRegime = "overbought";

  // MACD on beta
  const emaFast = ema(betaSeries, config.macdFast);
  const emaSlow = ema(betaSeries, config.macdSlow);
  const macdSeries: number[] = [];

  const len = Math.min(emaFast.length, emaSlow.length);
  for (let i = 0; i < len; i++) {
    macdSeries.push(emaFast[i] - emaSlow[i]);
  }

  const signalSeries = ema(macdSeries, config.macdSignal);
  const macdLine = macdSeries[macdSeries.length - 1] ?? 0;
  const signalLine = signalSeries[signalSeries.length - 1] ?? 0;

  let macdPhase: MomentumPhase = "neutral";
  if (macdLine > signalLine && slope > 0) macdPhase = "bullish";
  else if (macdLine < signalLine && slope < 0) macdPhase = "bearish";

  return {
    slope,
    rsi,
    rsiRegime,
    macdLine,
    signalLine,
    macdPhase,
  };
}
