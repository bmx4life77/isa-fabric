// src/analytics/calibrationEnvelope.ts

import { rsi } from "./metricUtils";

export interface CalibrationEnvelopeConfig {
  minScalableVU: number;   // e.g. 0.98
  betaSaturationThreshold: number; // e.g. 0.95
  minStabilityIndex: number;       // placeholder if you later wire SI
  rsiOversoldBeta: number;         // e.g. 0.30
}

export interface EnvelopeResult {
  scalableVU: { ok: boolean; minVU: number };
  saturation: { shardIndex?: number; threshold: number };
  betaRSI: { mostlyOversold: boolean; minRSI: number; maxRSI: number };
}

export function computeCalibrationEnvelope(
  beta: number[],
  vu: number[],
  shards: number[],
  cfg: CalibrationEnvelopeConfig
): EnvelopeResult {
  const minVU = Math.min(...vu);
  const scalableVU = {
    ok: minVU >= cfg.minScalableVU,
    minVU,
  };

  // Saturation point: first index where β < threshold
  let satIdx: number | undefined = undefined;
  for (let i = 0; i < beta.length; i++) {
    if (beta[i] < cfg.betaSaturationThreshold) {
      satIdx = i;
      break;
    }
  }

  const betaRsiSeries = rsi(beta, 14);
  const filtered = betaRsiSeries.filter((x) => !Number.isNaN(x));
  const minRSI = filtered.length
    ? Math.min(...filtered)
    : NaN;
  const maxRSI = filtered.length
    ? Math.max(...filtered)
    : NaN;
  const mostlyOversold = filtered.length
    ? filtered.every((v) => v < cfg.rsiOversoldBeta)
    : false;

  return {
    scalableVU,
    saturation: {
      shardIndex: satIdx,
      threshold: cfg.betaSaturationThreshold,
    },
    betaRSI: {
      mostlyOversold,
      minRSI,
      maxRSI,
    },
  };
}
