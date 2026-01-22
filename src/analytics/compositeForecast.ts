// src/analytics/compositeForecast.ts

import { computeSpectralProfile } from "./fftPredictor";
import { forecastVolatility } from "./volatilityAR1";
import { analyzeBetaMomentum } from "./betaMomentumPredictor";
import { defaultPredictiveConfig } from "./predictiveConfig";
import { MetricRecord } from "../types/AggregatedFile";

export interface SpectralProfile {
  lowBandEnergy: number;
  midBandEnergy: number;
  highBandEnergy: number;
  regularityScore: number;
}

export interface VolatilityForecast {
  sigma: number;
  regime: string;
}

export interface CompositeForecast {
  spectral: SpectralProfile;
  volatility: VolatilityForecast;
  betaTrend: number;
  classification: string;

  // NEW — FRE extensions
  thetaOpt?: number;
  confidence?: number;
}

export function buildCompositeForecast(
  series: MetricRecord[]
): CompositeForecast {

  const beta = series
    .map(s => s.beta)
    .filter((x): x is number => x !== undefined);

  const psi5 = series
    .map(s => s.psi5)
    .filter((x): x is number => x !== undefined);

  const vol = series
    .map(s => s.v)
    .filter((x): x is number => x !== undefined);

  const spectral = computeSpectralProfile(psi5);
  const volatility = forecastVolatility(vol, 16);
  const momentum = analyzeBetaMomentum(beta, defaultPredictiveConfig);

  const betaTrend = momentum.slope;

  let classification = "stable";

  if (volatility.sigma > 0.03) classification = "turbulent";
  else if (volatility.sigma > 0.02) classification = "elevated";

  if (betaTrend < -0.002) classification = "downtrend";
  if (betaTrend > 0.002) classification = "uptrend";

  return {
    spectral,
    volatility,
    betaTrend,
    classification
  };
}
