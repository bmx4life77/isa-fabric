// src/analytics/loadMetrics.ts

import * as fs from "fs";
import { AggregatedFile, MetricRecord } from "../types/AggregatedFile";

/**
 * loadMetrics(path)
 *
 * Accepts:
 *   - { time_series: [...] }
 *   - { series: [...] }
 *
 * Always returns:
 *   {
 *      metadata: {...},
 *      series: MetricRecord[]
 *   }
 *
 * This guarantees compatibility with:
 *   • isaDiagnostics
 *   • envelopeCli
 *   • compositeForecast
 *   • the FRE ingestion pipeline
 */
export function loadMetrics(path: string): AggregatedFile {
    const raw = fs.readFileSync(path, "utf8");
    const obj = JSON.parse(raw);

    // Normalize metadata
    const metadata = obj.metadata ?? {
        source: "unknown",
        generatedAt: new Date().toISOString(),
        notes: []
    };

    // Support new preferred ISA key: time_series
    if (Array.isArray(obj.time_series)) {
        return {
            metadata,
            series: obj.time_series as MetricRecord[]
        };
    }

    // Support legacy key: series
    if (Array.isArray(obj.series)) {
        return {
            metadata,
            series: obj.series as MetricRecord[]
        };
    }

    throw new Error(
        "Invalid metrics format: expected { time_series: [...] } or { series: [...] }"
    );
}
