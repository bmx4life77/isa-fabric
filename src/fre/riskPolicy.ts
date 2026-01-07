// src/fre/riskPolicy.ts
import { FRERegime, RiskBand } from "./types";
import { POLICY } from "./policyConfig";

export interface RiskInputs {
  regimes: string[];
  betaMomentum?: { slope?: number; rsi?: number; macdPhase?: string } | any;
  psi5Spectral?: { regularityScore?: number; lowBandEnergy?: number } | any;
  composite?: {
    betaTrend?: number;
    classification?: string;
    volatility?: { sigma?: number; regime?: string };
  } | any;
  shockApplied?: boolean;
}

export interface RiskDecision {
  dominantRegime: FRERegime;
  riskBand: RiskBand;
  confidence: number; // 0..1
  notes: string[];
}

function clamp01(x: number): number {
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function regimeHistogram(regimes: string[]): Record<string, number> {
  const hist: Record<string, number> = {};
  for (const r of regimes) hist[r] = (hist[r] ?? 0) + 1;
  return hist;
}

export function dominantRegimeFrom(regimes: string[]): FRERegime {
  const hist = regimeHistogram(regimes);
  const top = Object.entries(hist).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (top === "stable" || top === "transitional" || top === "oversaturated") return top as FRERegime;
  return "unknown";
}

/**
 * Risk policy is intentionally simple + deterministic.
 * You can tighten it later without changing consumers (UI/CLI/FRE).
 */
export function evaluateRisk(inputs: RiskInputs): RiskDecision {
  const notes: string[] = [];

  const dom: FRERegime = dominantRegimeFrom(inputs.regimes ?? []);
  const slope: number | undefined = inputs.betaMomentum?.slope ?? inputs.composite?.betaTrend;
  const macdPhase: string = inputs.betaMomentum?.macdPhase ?? "unknown";
  const regularity: number | undefined = inputs.psi5Spectral?.regularityScore;
  const sigma: number | undefined = inputs.composite?.volatility?.sigma;

  // ---- Confidence (signal agreement) ----
  let confidence = 0.6; // baseline
  if (dom !== "unknown") confidence += 0.1;
  if (typeof slope === "number") confidence += 0.05;
  if (typeof regularity === "number") confidence += 0.05;
  if (typeof sigma === "number") confidence += 0.05;

  // penalize if shock applied (future: you can reduce less for “known test mode”)
  if (inputs.shockApplied) {
    confidence -= 0.1;
    notes.push("Confidence reduced due to applied shock scenario.");
  }

  confidence = clamp01(confidence);

  // ---- Risk band ----
  // Default: conservative unknown -> yellow (not green)
  let riskBand: RiskBand = dom === "unknown" ? "yellow" : "green";

  // 1) Oversaturated tends to be yellow unless everything is calm
  if (dom === "oversaturated") {
    riskBand = "yellow";
    notes.push("Dominant regime 'oversaturated' -> caution band by default.");
  }

  // 2) Trend pressure (use POLICY beta thresholds)
  if (typeof slope === "number" && slope < POLICY.beta.strongDown) {
    riskBand = "red";
    notes.push(`Beta trend is strongly negative (slope=${slope.toFixed(4)}).`);
  } else if (typeof slope === "number" && slope < POLICY.beta.mildDown) {
    riskBand = "yellow";
    notes.push(`Beta trend is negative (slope=${slope.toFixed(4)}).`);
  }

  // 3) If MACD phase is bearish, don’t allow green
  if (macdPhase === "bearish" && riskBand === "green") {
    riskBand = "yellow";
    notes.push("MACD phase bearish -> prevents green classification.");
  }

  // 4) Volatility signal (use POLICY sigma thresholds)
  if (typeof sigma === "number") {
    if (sigma >= POLICY.sigma.red) {
      riskBand = "red";
      notes.push(`High volatility sigma=${sigma.toFixed(4)}.`);
    } else if (sigma >= POLICY.sigma.yellow && riskBand === "green") {
      riskBand = "yellow";
      notes.push(`Moderate volatility sigma=${sigma.toFixed(4)}.`);
    }
  }

  // 5) High regularity is stabilizing (but not enough to override severe negatives)
  if (typeof regularity === "number" && regularity > POLICY.spectral.highRegularity && riskBand !== "red") {
    notes.push("High spectral regularity supports stability interpretation.");
    // allow green only if not oversaturated and not bearish
    if (dom !== "oversaturated" && macdPhase !== "bearish") riskBand = "green";
  }

  return { dominantRegime: dom, riskBand, confidence, notes };
}
