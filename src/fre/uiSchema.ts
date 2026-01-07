// src/fre/uiSchema.ts
import { FRERegime, FRERiskBand, FRENarrative } from "./types";

export interface FREUIPayload {
  meta: {
    runId: string;
    ts: string;
    file: string;
    points: number;
    schema: "series" | "time_series" | "unknown";
  };

  status: {
    dominantRegime: FRERegime;
    riskBand: FRERiskBand;
    confidence: number;
  };

  charts: {
    psi5Wavelet: number[];
    volWavelet: number[];
    psi5Spectrum: any;
    betaMomentum: any;
  };

  narrative: FRENarrative;

  // Optional block for UI to show when in shock mode
  shock?: {
    applied: boolean;
    summary?: string;
    effects?: string[];
  };
}
