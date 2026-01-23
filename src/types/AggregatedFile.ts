// src/types/AggregatedFile.ts

// Flexible metric record that supports both calibration datasets and telemetry datasets.
export interface MetricRecord {
    // Common standard metrics
    beta?: number;
    psi5?: number;
    v?: number;         // volatility
    vu?: number;
    iota?: number;
    phi?: number;

    // Calibration-structure fields
    timeIndex?: number;
    shards?: number;

    // Telemetry-style fields
    ts?: string;         // ISO timestamp
    SE?: number;         // system efficiency extended
    divergence?: number;
    rsi?: number;
    vol?: number;

    // RASUV cluster (optional)
    r?: number;
    a?: number;
    s?: number;
    u?: number;

    // Index signature to absorb future ISA metrics
    [key: string]: any;
}

// Top-level dataset container
export interface AggregatedFile {
    metadata?: any;       // classic calibration style
    summary?: any;        // telemetry style

    series?: MetricRecord[];
    time_series?: MetricRecord[];
}
