// src/analytics/narrative.ts
import { FRERegime, FRERiskBand, FRENarrative } from "../fre/types";

export interface NarrativeInputs {
  dominantRegime: FRERegime;
  riskBand: FRERiskBand;
  confidence: number;
  confidenceNotes: string[];

  betaMomentum?: any;
  psi5Spectral?: any;
  composite?: any;

  shockExplanation?: { summary: string; effects: string[] };
}

function fmtPct(x: number): string {
  const v = Math.round(x * 100);
  return `${v}%`;
}

export function buildNarrative(n: NarrativeInputs): FRENarrative {
  const bullets: string[] = [];

  const slope = n.betaMomentum?.slope ?? n.composite?.betaTrend;
  const macd = n.betaMomentum?.macdPhase;
  const reg = n.psi5Spectral?.regularityScore;

  let headline = "System status unavailable";
  if (n.riskBand === "green") headline = "System operating within expected stability bounds";
  if (n.riskBand === "yellow") headline = "System stable but showing caution signals";
  if (n.riskBand === "red") headline = "System under elevated stress conditions";

  bullets.push(`Dominant regime classified as '${n.dominantRegime}'.`);

  if (typeof slope === "number") {
    const dir = slope < 0 ? "negative" : "positive";
    bullets.push(`Beta momentum slope is ${dir} (${slope.toFixed(4)}), indicating throughput commitment trend.`);
  }

  if (macd) bullets.push(`MACD phase is '${macd}', reinforcing momentum interpretation.`);

  if (typeof reg === "number") {
    bullets.push(
      reg > 0.9
        ? "Spectral structure is highly regular, suggesting coherent system dynamics."
        : "Spectral structure is noisy, suggesting reduced coherence."
    );
  }

  if (n.shockExplanation) {
    bullets.push(`Shock scenario: ${n.shockExplanation.summary}`);
    for (const e of n.shockExplanation.effects.slice(0, 3)) bullets.push(e);
  }

  // confidence notes already computed by risk policy
  const confidenceNotes = [
    `Confidence = ${fmtPct(n.confidence)} based on agreement between regime, momentum, and spectral structure.`,
    ...n.confidenceNotes,
  ];

  return {
    headline,
    bullets,
    confidence: n.confidence,
    confidenceNotes,
  };
}
