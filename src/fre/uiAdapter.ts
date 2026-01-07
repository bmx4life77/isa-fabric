// src/fre/uiAdapter.ts
import { FREReport } from "./types";
import { FREUIPayload } from "./uiSchema";

export function toUiPayload(report: FREReport, confidence: number): FREUIPayload {
  const shock = report.forecast?.shockExplanation
    ? {
        applied: true,
        summary: report.forecast.shockExplanation.summary,
        effects: report.forecast.shockExplanation.effects,
      }
    : { applied: false };

  return {
    meta: {
      runId: report.runId,
      ts: report.ts,
      file: report.input.file,
      points: report.input.points,
      schema: report.input.schema,
    },
    status: {
      dominantRegime: report.dominantRegime,
      riskBand: report.riskBand,
      confidence,
    },
    charts: {
      psi5Wavelet: report.envelope.wavePsi5 ?? [],
      volWavelet: report.envelope.waveVol ?? [],
      psi5Spectrum: report.diagnostics.psi5Spectral ?? {},
      betaMomentum: report.diagnostics.betaMomentum ?? {},
    },
    narrative: report.narrative ?? {
      headline: "Narrative unavailable",
      bullets: [],
      confidence,
      confidenceNotes: [],
    },
    shock,
  };
}
