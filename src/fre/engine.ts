// src/fre/engine.ts
import fs from "fs";
import { emitEvent, nowIso } from "./events";
import { evaluateRisk } from "./riskPolicy";
import { buildNarrative } from "../analytics/narrative";
import { applyShock } from "../analytics/shock";

import { loadMetrics } from "../analytics/loadMetrics";
import { computeWaveletEnvelope, buildSummary } from "../analytics/stabilityEnvelope";
import { classifyRegimes } from "../analytics/predictiveModel";
import { analyzeBetaMomentum } from "../analytics/betaMomentumPredictor";
import { computeSpectralProfile } from "../analytics/fftPredictor";
import { buildCompositeForecast } from "../analytics/compositeForecast";
import { defaultPredictiveConfig } from "../analytics/predictiveConfig";

import { AggregatedFile, MetricRecord } from "../types/AggregatedFile";
import { FREInput, FREReport, FRERegime, FREForecastResult } from "./types";

function inferSchemaShape(raw: any): "series" | "time_series" | "unknown" {
  if (Array.isArray(raw?.series)) return "series";
  if (Array.isArray(raw?.time_series)) return "time_series";
  return "unknown";
}

function dominantRegimeFromList(regimes: string[]): FRERegime {
  const hist: Record<string, number> = {};
  for (const r of regimes) hist[r] = (hist[r] ?? 0) + 1;
  const top = Object.entries(hist).sort((a, b) => b[1] - a[1])[0]?.[0];
  if (top === "stable" || top === "transitional" || top === "oversaturated") return top as FRERegime;
  return "unknown";
}

export async function runFRE(input: FREInput): Promise<FREReport> {
  const runId = input.runId ?? `fre_${Date.now()}`;
  const emit = !!input.emitEvents;

  emitEvent({ type: "fre:start", ts: nowIso(), runId, payload: { file: input.file } }, emit);

  const rawText = fs.readFileSync(input.file, "utf-8");
  const raw = JSON.parse(rawText);
  const schema = inferSchemaShape(raw);

  const metrics: AggregatedFile = loadMetrics(input.file);
  let series: MetricRecord[] = metrics.series ?? [];
  const points = series.length;

  if (!points) {
    throw new Error("No metric points found after loadMetrics normalization.");
  }

  emitEvent({ type: "fre:loaded", ts: nowIso(), runId, payload: { points, schema } }, emit);

  // ---- Shock handling ----
  let shockExplanation: FREForecastResult["shockExplanation"];
  let shockApplied = false;

  if (input.shockSpec) {
    const shockResult = applyShock(series, input.shockSpec);
    series = shockResult.series ?? series; // standardized
    shockApplied = true;

    shockExplanation = {
      summary: `Shock '${input.shockSpec.mode}' applied (start=${shockResult.start}, len=${shockResult.len}).`,
      effects: [
        "Synthetic perturbation to test regime and risk sensitivity.",
        "Post-shock risk bands are for stress testing unless live telemetry is used.",
      ],
    };
  }

  // ---- Telemetry arrays ----
  const beta = series.map(m => m.beta).filter((x): x is number => typeof x === "number");
  const psi5 = series.map(m => m.psi5).filter((x): x is number => typeof x === "number");
  const vol  = series.map(m => m.v).filter((x): x is number => typeof x === "number");

  // ---- Envelope ----
  const envelopeSummary = buildSummary(input.file, series);
  const wavePsi5 = computeWaveletEnvelope(psi5, 5, 0.5);
  const waveVol  = computeWaveletEnvelope(vol, 5, 0.5);

  // ---- Diagnostics ----
  const regimes = classifyRegimes(beta, psi5, vol, {
    stableBeta: 0.96,
    transitionalBeta: 0.92,
    stablePsi5: 0.94,
    volatilityRidge: 0.18,
  });

  const betaMomentum = analyzeBetaMomentum(beta, defaultPredictiveConfig);
  const psi5Spectral = computeSpectralProfile(psi5);

  // ---- Composite forecast (single source) ----
  const composite = buildCompositeForecast(series);

  // ---- Risk policy ----
  const decision = evaluateRisk({
    regimes,
    betaMomentum,
    psi5Spectral,
    composite,
    shockApplied,
  });

  const forecast: FREForecastResult = {
    composite,
    dominantRegime: decision.dominantRegime,
    riskBand: decision.riskBand,
    shockExplanation,
  };

  const baseReport: FREReport = {
    version: "FRE/0.1",
    runId,
    ts: nowIso(),
    input: { file: input.file, points, schema },
    envelope: { summary: envelopeSummary, wavePsi5, waveVol },
    diagnostics: { regimes, betaMomentum, psi5Spectral },
    forecast,
    dominantRegime: decision.dominantRegime,
    riskBand: decision.riskBand,
    notes: [
      schema === "time_series"
        ? "Input is time_series telemetry normalized into series for ISA engines."
        : "Input is series/shard-sweep style or normalized equivalent.",
    ],
  };

  const narrative = buildNarrative(baseReport, {
    confidence: decision.confidence,
    notes: decision.notes,
  });

  const report: FREReport = { ...baseReport, narrative };
  return report;
}
