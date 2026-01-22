// src/analytics/predictiveModel.ts

import { ema } from "./metricUtils";

export type RegimeLabel = "STABLE" | "DEFENSIVE" | "SATURATED";

export interface PredictiveConfig {
    stableBeta: number;
    transitionalBeta: number;
    stablePsi5: number;
    volatilityRidge: number;
}

export interface RegimePoint {
  index: number;
  regime: RegimeLabel;
}

export function classifyRegimes(
    beta: number[],
    psi5: number[],
    vol: number[],
    config: PredictiveConfig
) {
    const regimes = [];

    for (let i = 0; i < beta.length; i++) {
        const b = beta[i];
        const p = psi5[i];
        const v = vol[i];

        if (b >= config.stableBeta && p <= config.stablePsi5) {
            regimes.push("stable");
        } else if (b >= config.transitionalBeta || v >= config.volatilityRidge) {
            regimes.push("transitional");
        } else {
            regimes.push("oversaturated");
        }
    }

    return regimes;
}
