// src/analytics/predictiveConfig.ts

export interface PredictiveConfig {
  rsiWindow: number;
  rsiOversold: number;
  rsiOverbought: number;

  bollingerWindow: number;
  bollingerStdDev: number;

  macdFast: number;
  macdSlow: number;
  macdSignal: number;

  volatilityLookback: number;

  // === ISA Regime Thresholds ===
  stableBeta: number;
  transitionalBeta: number;
  stablePsi5: number;
  volatilityRidge: number;
}

export const defaultPredictiveConfig: PredictiveConfig = {
  rsiWindow: 14,
  rsiOversold: 0.30,
  rsiOverbought: 0.70,

  bollingerWindow: 20,
  bollingerStdDev: 2.0,

  macdFast: 12,
  macdSlow: 26,
  macdSignal: 9,

  volatilityLookback: 16,

  stableBeta: 0.96,
  transitionalBeta: 0.92,
  stablePsi5: 0.94,
  volatilityRidge: 0.18
};
