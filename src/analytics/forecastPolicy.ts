// src/analytics/forecastPolicy.ts

export type RiskBand = "green" | "yellow" | "red" | "unknown";
export type Regime = "stable" | "transitional" | "oversaturated" | "unknown";

export interface PolicyThresholds {
  // Regime dominance
  dominanceMinShare: number; // e.g. 0.60 means 60%+ of points agree

  // Beta momentum / trend
  betaSlopeBearish: number; // e.g. < -0.0015 is downtrend
  betaSlopeCritical: number; // e.g. < -0.0040 is severe

  // RSI (0–1 normalized in your system)
  rsiOversold: number; // e.g. < 0.30
  rsiOverbought: number; // e.g. > 0.70

  // Psi5 spectral / regularity
  regularityHigh: number; // e.g. > 0.92 (very regular / structured)
  highBandEnergyHigh: number; // e.g. > 1.0 indicates high-frequency stress (dataset-dependent)

  // Volatility (sigma) policy (your AR1 currently can return sigma=0 in edge cases)
  sigmaWarn: number; // e.g. > 0.03
  sigmaCritical: number; // e.g. > 0.06

  // Envelope sanity
  minPoints: number;
}

export const defaultPolicyThresholds: PolicyThresholds = {
  dominanceMinShare: 0.6,

  betaSlopeBearish: -0.0015,
  betaSlopeCritical: -0.004,

  rsiOversold: 0.30,
  rsiOverbought: 0.70,

  regularityHigh: 0.92,
  highBandEnergyHigh: 1.0,

  sigmaWarn: 0.03,
  sigmaCritical: 0.06,

  minPoints: 12,
};

export interface EnvelopeSummary {
  file?: string;
  points: number;
  beta_mean: number;
  psi5_mean: number;
  vol_mean: number;
}

export interface BetaMomentum {
  slope: number;
  rsi: number;
  rsiRegime: string;
  macdLine: number;
  signalLine: number;
  macdPhase: string; // "bearish" etc.
}

export interface SpectralProfile {
  lowBandEnergy: number;
  midBandEnergy: number;
  highBandEnergy: number;
  regularityScore: number;
}

export interface VolatilityForecast {
  sigma: number; // can be 0 if insufficient data / model fallback
  regime: string; // "low/moderate/high/unknown"
}

export interface PolicyInput {
  regimes?: string[]; // from classifyRegimes
  envelopeSummary?: EnvelopeSummary;
  betaMomentum?: BetaMomentum;
  psi5Spectral?: SpectralProfile;
  volatility?: VolatilityForecast;
}

export interface PolicyOutput {
  dominantRegime: Regime;
  riskBand: RiskBand;
  alerts: string[];
  recommendedActions: string[];
  debug: Record<string, any>;
}

function histogram(list: string[] = []): Record<string, number> {
  const h: Record<string, number> = {};
  for (const x of list) h[x] = (h[x] ?? 0) + 1;
  return h;
}

function pickDominantRegime(regimes: string[] | undefined, minShare: number): Regime {
  if (!regimes || regimes.length === 0) return "unknown";
  const h = histogram(regimes);
  const total = regimes.length;
  const [topKey, topCount] = Object.entries(h).sort((a, b) => b[1] - a[1])[0] ?? [];
  if (!topKey || !topCount) return "unknown";
  const share = topCount / total;

  if (share < minShare) return "unknown";
  if (topKey === "stable" || topKey === "transitional" || topKey === "oversaturated") return topKey;
  return "unknown";
}

function safeNumber(x: any): number | undefined {
  return typeof x === "number" && Number.isFinite(x) ? x : undefined;
}

export function applyForecastPolicy(
  input: PolicyInput,
  thresholds: PolicyThresholds = defaultPolicyThresholds
): PolicyOutput {
  const alerts: string[] = [];
  const actions: string[] = [];
  const env = input.envelopeSummary;
  const points = env?.points ?? 0;

  // 0) Basic validity gate
  if (points && points < thresholds.minPoints) {
    alerts.push(`Insufficient points (${points}) for high-confidence policy. Minimum=${thresholds.minPoints}.`);
  }

  // 1) Dominant regime from classifier output
  const dom = pickDominantRegime(input.regimes, thresholds.dominanceMinShare);

  // 2) Pull momentum/spectral/volatility safely
  const slope = safeNumber(input.betaMomentum?.slope);
  const rsi = safeNumber(input.betaMomentum?.rsi);
  const macdPhase = input.betaMomentum?.macdPhase;

  const regularity = safeNumber(input.psi5Spectral?.regularityScore);
  const highBand = safeNumber(input.psi5Spectral?.highBandEnergy);

  const sigma = safeNumber(input.volatility?.sigma);

  // 3) Risk band (deterministic, explainable)
  // Start neutral and escalate.
  let band: RiskBand = "green";

  // Regime-based escalation
  if (dom === "oversaturated") {
    band = "yellow";
    alerts.push("Dominant regime is oversaturated → baseline risk elevated.");
  } else if (dom === "transitional") {
    band = "yellow";
    alerts.push("Dominant regime is transitional → instability potential elevated.");
  } else if (dom === "unknown") {
    band = "unknown";
    alerts.push("Dominant regime unknown → policy confidence reduced.");
  }

  // Trend-based escalation
  if (slope !== undefined) {
    if (slope <= thresholds.betaSlopeCritical) {
      band = "red";
      alerts.push(`β slope is critically negative (${slope.toFixed(6)}) → severe downtrend.`);
    } else if (slope <= thresholds.betaSlopeBearish) {
      if (band === "green") band = "yellow";
      alerts.push(`β slope negative (${slope.toFixed(6)}) → downtrend present.`);
    }
  } else {
    alerts.push("β slope unavailable → trend confidence reduced.");
  }

  // RSI hints (0–1 normalized)
  if (rsi !== undefined) {
    if (rsi < thresholds.rsiOversold) {
      if (band === "green") band = "yellow";
      alerts.push(`RSI(β) oversold (${rsi.toFixed(3)}) → efficiency pressure / potential trough.`);
    } else if (rsi > thresholds.rsiOverbought) {
      alerts.push(`RSI(β) overbought (${rsi.toFixed(3)}) → watch for reversal risk.`);
    }
  }

  // Spectral stress flags (dataset-dependent, but deterministic)
  if (regularity !== undefined && regularity > thresholds.regularityHigh) {
    alerts.push(`ψ₅ regularity high (${regularity.toFixed(3)}) → structured/consistent regime behavior.`);
  }
  if (highBand !== undefined && highBand > thresholds.highBandEnergyHigh) {
    if (band !== "red") band = "yellow";
    alerts.push(`ψ₅ high-band energy elevated (${highBand.toFixed(3)}) → high-frequency stress components.`);
  }

  // Volatility escalation (if sigma is meaningful)
  if (sigma !== undefined) {
    if (sigma >= thresholds.sigmaCritical) {
      band = "red";
      alerts.push(`Volatility σ is critical (${sigma.toFixed(6)}) → instability tail risk elevated.`);
    } else if (sigma >= thresholds.sigmaWarn) {
      if (band === "green") band = "yellow";
      alerts.push(`Volatility σ elevated (${sigma.toFixed(6)}) → widening envelope / risk rising.`);
    }
  } else {
    alerts.push("Volatility σ unavailable/NaN → volatility confidence reduced.");
  }

  // 4) Recommended actions (simple, crisp, operator-friendly)
  if (band === "red") {
    actions.push("Engage defensive mode: tighten invariants, enable extra validation checks.");
    actions.push("Throttle risky execution paths; reduce concurrency where possible.");
    actions.push("Trigger incident telemetry capture (full trace + ISA snapshot).");
  } else if (band === "yellow") {
    actions.push("Increase monitoring cadence; enable alerting for ψ₅ spikes and β slope acceleration.");
    actions.push("Run targeted adversarial shocks at the next predicted inflection window.");
    actions.push("Consider soft throttling if β continues to degrade.");
  } else if (band === "green") {
    actions.push("Normal operation: keep baseline checks; continue telemetry collection.");
    actions.push("Optional: run periodic lightweight adversarial probes.");
  } else {
    actions.push("Policy confidence low: collect more data points and re-run diagnostics.");
    actions.push("Verify schema + loader normalization (series/time_series).");
  }

  // Use MACD phase as a narrative amplifier (doesn't override band)
  if (macdPhase === "bearish") {
    alerts.push("MACD phase bearish → confirms downward momentum bias.");
  }

  return {
    dominantRegime: dom,
    riskBand: band,
    alerts,
    recommendedActions: actions,
    debug: {
      points,
      slope,
      rsi,
      macdPhase,
      regularity,
      highBand,
      sigma,
      regimeHistogram: histogram(input.regimes ?? []),
    },
  };
}
