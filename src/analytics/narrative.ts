// src/analytics/narrative.ts
import type { FREReport } from "../fre/types";

export function buildNarrative(
  report: FREReport,
  extras?: { confidence?: number; notes?: string[] }
): string {
  if (!report || !report.diagnostics) {
    return "FRE Narrative: diagnostics unavailable.";
  }

  const regime = report.dominantRegime;
  const band = report.riskBand;
  const slope =
    report.diagnostics.betaMomentum?.slope;
  const energy =
    (report.diagnostics as any).psi5Spectral?.energy ??
    (report.diagnostics as any).psi5Spectral?.regularityScore;
  const conf = extras?.confidence ?? report.forecast?.composite?.confidence;
  const shocked = !!report.forecast?.shockExplanation;

  const parts: string[] = [];
  parts.push(`Regime appears **${regime}** with risk band **${band}**.`);
  if (typeof slope === "number") parts.push(`Beta-momentum slope: ${slope.toFixed(3)}.`);
  if (typeof energy === "number") parts.push(`Spectral indicator: ${Number(energy).toFixed(3)}.`);
  if (typeof conf === "number") parts.push(`Composite confidence ≈ ${(conf * 100).toFixed(1)}%.`);
  if (shocked) parts.push(`Shock test applied: ${report.forecast.shockExplanation?.summary}`);
  if (extras?.notes?.length) parts.push(extras.notes.join(" "));

  return `FRE Narrative — ${parts.join(" ")}`;
}
