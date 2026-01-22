// src/analytics/stabilityEnvelope.ts
import { MetricRecord } from "../types/AggregatedFile";

/**
 * Safe numeric filtering helper.
 */
function clean(arr: (number | undefined)[]): number[] {
    return arr.filter((x): x is number => x !== undefined);
}

/**
 * Wavelet-style smoothed envelope (simple moving average kernel).
 */
export function computeWaveletEnvelope(
    series: number[],
    window: number = 5,
    alpha: number = 0.5
): number[] {
    const out: number[] = [];
    for (let i = 0; i < series.length; i++) {
        const start = Math.max(0, i - window);
        const slice = series.slice(start, i + 1);
        const wavg =
            slice.reduce((a, b) => a + b, 0) / slice.length;

        const blended = (alpha * wavg) + ((1 - alpha) * series[i]);
        out.push(blended);
    }
    return out;
}

/**
 * Stability envelope for beta vs. vol.
 * Returns smoothed beta/vol region boundaries.
 */
export function computeStabilityEnvelope(
    beta: (number | undefined)[],
    vol: (number | undefined)[],
    config: { betaFloor?: number; betaCeil?: number; volFloor?: number; volCeil?: number } = {}
) {
    const cleanBeta = clean(beta);
    const cleanVol = clean(vol);

    const betaMin = Math.min(...cleanBeta);
    const betaMax = Math.max(...cleanBeta);
    const volMin = Math.min(...cleanVol);
    const volMax = Math.max(...cleanVol);

    return {
        betaFloor: config.betaFloor ?? betaMin,
        betaCeil: config.betaCeil ?? betaMax,
        volFloor: config.volFloor ?? volMin,
        volCeil: config.volCeil ?? volMax
    };
}

/**
 * Build human-readable envelope summary.
 */
export function buildSummary(file: string, series: MetricRecord[]) {
    const beta = clean(series.map(s => s.beta));
    const psi5 = clean(series.map(s => s.psi5));
    const vol = clean(series.map(s => s.vol ?? s.v));

    return {
        file,
        points: series.length,
        beta_mean: beta.reduce((a, b) => a + b, 0) / beta.length,
        psi5_mean: psi5.reduce((a, b) => a + b, 0) / psi5.length,
        vol_mean: vol.reduce((a, b) => a + b, 0) / vol.length
    };
}
