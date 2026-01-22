// src/analytics/forecastCli.ts

import { loadMetrics } from "./loadMetrics";
import { buildCompositeForecast } from "./compositeForecast";
import { MetricRecord, AggregatedFile } from "../types/AggregatedFile";

import { applyShock, parseCustomSpec, ShockMode, ShockSpec } from "./shock";

function getArg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  if (i === -1) return undefined;
  return process.argv[i + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

function parseShockSpec(): ShockSpec | undefined {
  const modeStr = getArg("--shock") as ShockMode | undefined;
  if (!modeStr) return undefined;

  const shockLenStr = getArg("--shockLen");
  const shockLen = shockLenStr ? Number(shockLenStr) : undefined;

  if (modeStr === "custom") {
    const custom = getArg("--custom");
    if (!custom) {
      throw new Error(`--shock custom requires --custom "start=...,len=...,beta=...,psi5=...,vMult=..."`);
    }
    const spec = parseCustomSpec(custom);
    if (shockLen !== undefined) spec.len = shockLen;
    return spec;
  }

  return { mode: modeStr, len: shockLen };
}

function runForecastCli() {
  const file = process.argv[2] ?? "data/aggregated_metrics3_2.json";

  console.log(`\n🔮 ISA Composite Forecast – ${file}\n`);

  const metrics: AggregatedFile = loadMetrics(file);
  const baseSeries: MetricRecord[] = metrics.series ?? [];

  if (!baseSeries.length) {
    console.error("❌ No series points found. Check your input file or loadMetrics normalization.");
    process.exit(1);
  }

  const shockSpec = parseShockSpec();

  let series = baseSeries;
  if (shockSpec) {
    const shockRes = applyShock(baseSeries, shockSpec);
    series = shockRes.series;

    console.log("💥 Shock Applied:");
    console.log({
      mode: shockRes.spec.mode,
      start: shockRes.start,
      len: shockRes.len,
      betaDelta: shockRes.spec.betaDelta,
      psi5Delta: shockRes.spec.psi5Delta,
      vMult: shockRes.spec.vMult,
    });
    console.log("");
  }

  // IMPORTANT: buildCompositeForecast currently takes ONE arg in your repo.
  const forecast = buildCompositeForecast(series);

  // Print whatever shape it is — do not assume nested fields.
  console.log("📊 Composite Forecast Output:");
  console.log(forecast);
}

runForecastCli();
