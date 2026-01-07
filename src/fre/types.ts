// src/fre/types.ts
import type { MetricRecord } from "../types/AggregatedFile";

// Reuse the analytics types directly to avoid “same-name, different-module” clashes
export type ShockMode = import("../analytics/shock").ShockMode;
export type ShockSpec  = import("../analytics/shock").ShockSpec;
// REPLACE the current CompositeForecast line with this:
export type CompositeForecast =
  import("../analytics/compositeForecast").CompositeForecast & {
    confidence?: number; // optional, used by UI/narrative
  };


export type FRERegime = "stable" | "transitional" | "oversaturated" | "unknown";
export type RiskBand  = "green" | "yellow" | "red";

// Back-compat aliases some files import:
export type FRERiskBand  = RiskBand;
export type FRENarrative =
  | string
  | { headline: string; bullets: string[]; confidence?: number; confidenceNotes?: string[] };

export interface ShockResult {
  series: MetricRecord[];    // standardize on 'series'
  start: number;
  len: number;
}

export interface FREInput {
  file: string;
  runId?: string;
  emitEvents?: boolean;
  shockSpec?: ShockSpec;     // exact same type as analytics/shock
}

export interface FREForecastResult {
  composite: CompositeForecast;  // exact same type as analytics/compositeForecast
  dominantRegime: FRERegime;
  riskBand: RiskBand;
  shockExplanation?: {
    summary: string;
    effects: string[];
  };
}

export interface FREReport {
  version: string;
  runId: string;
  ts: string;
  input: {
    file: string;
    points: number;
    schema: "series" | "time_series" | "unknown";
  };
  envelope: {
    summary: unknown;
    wavePsi5: number[];
    waveVol: number[];
  };
  diagnostics: {
    regimes: string[];
    betaMomentum?: { slope?: number; strength?: number; window?: number };
    // accept either the “peaks/energy” shape or the band-energy shape
    psi5Spectral?:
      | { peaks?: number[]; energy?: number }
      | {
          lowBandEnergy: number;
          midBandEnergy: number;
          highBandEnergy: number;
          regularityScore: number;
        };
  };
  forecast: FREForecastResult;
  dominantRegime: FRERegime;
  riskBand: RiskBand;
  narrative?: FRENarrative;
  notes?: string[];
}
