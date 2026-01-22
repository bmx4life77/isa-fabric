// src/analytics/isaDiagnostics.ts
import { defaultPredictiveConfig } from "./predictiveConfig";
import { computeSpectralProfile } from "./fftPredictor";
import { analyzeBetaMomentum } from "./betaMomentumPredictor";
import { buildCompositeForecast } from "./compositeForecast";
import { loadMetrics } from "./loadMetrics";
import { classifyRegimes } from "./predictiveModel";
import { AggregatedFile, MetricRecord } from "../types/AggregatedFile";

function runDiagnostics(file: string) {
    console.log(`\n🔍 ISA Diagnostics – ${file}\n`);

    const metrics: AggregatedFile = loadMetrics(file);
    const series = metrics.series ?? [];

    if (!series.length) {
        console.error("❌ No metrics found.");
        return;
    }

    const beta = series.map(m => m.beta).filter((x): x is number => x !== undefined);
    const psi5 = series.map(m => m.psi5).filter((x): x is number => x !== undefined);
    const vol = series.map(m => m.v).filter((x): x is number => x !== undefined);

    const regimes = classifyRegimes(beta, psi5, vol, {
        stableBeta: 0.96,
        transitionalBeta: 0.92,
        stablePsi5: 0.94,
        volatilityRidge: 0.18
    });

    console.log("📊 Regime Classification:");
    console.log(regimes);

    console.log("\n📈 Beta Momentum:");
    console.log(analyzeBetaMomentum(beta, defaultPredictiveConfig));

    console.log("\n🎼 Spectral Profile (psi5):");
    console.log(computeSpectralProfile(psi5));
}

const inputFile = process.argv[2] ?? "data/aggregated_metrics3_2.json";
runDiagnostics(inputFile);
