// src/analytics/envelopeCli.ts
import { loadMetrics } from "./loadMetrics";
import { computeWaveletEnvelope, buildSummary } from "./stabilityEnvelope";
import { AggregatedFile, MetricRecord } from "../types/AggregatedFile";

function runEnvelopeCli(file: string) {
    console.log(`\n🧬 ISA Stability Envelope – ${file}\n`);

    const metrics: AggregatedFile = loadMetrics(file);
    const series = metrics.series ?? [];

    if (!series.length) {
        console.error("❌ No metrics found.");
        return;
    }

    const beta = series.map(m => m.beta).filter((x): x is number => x !== undefined);
    const psi5 = series.map(m => m.psi5).filter((x): x is number => x !== undefined);
    const vol = series
          .map(m => (m.vol ?? m.v))       // support both schemas safely
          .filter((x): x is number => x !== undefined);

    const wavePsi5 = computeWaveletEnvelope(psi5, 5, 0.5);
    const waveVol = computeWaveletEnvelope(vol, 5, 0.5);

    const summary = buildSummary(file, series);

    console.log("📊 Stability Envelope Summary:");
    console.log(summary);

    console.log("\n🔬 Wavelet Envelope (psi5):");
    console.log(wavePsi5);

    console.log("\n🔬 Wavelet Envelope (vol):");
    console.log(waveVol);
}

const inputFile = process.argv[2] ?? "data/aggregated_metrics3_2.json";
runEnvelopeCli(inputFile);
