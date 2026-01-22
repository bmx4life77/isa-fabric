// src/calibration/CalibrationTypes.ts

export type ShardCount = number;

/**
 * Shard profile config for calibration sweeps.
 * Option C: 8, 16, 24, 32, 48, 64, 96, 128
 */
export interface ShardProfileConfig {
  shardProfile: ShardCount[];
}

/**
 * Thresholds for the Four Pillars:
 * - Scalability (VU)
 * - Saturation (β)
 * - Temporal Stability (SI)
 */
export interface FourPillarThresholds {
  // Pillar 1: Scalability (VU)
  minScalableVU: number; // e.g. 0.98

  // Pillar 2: Saturation (β)
  betaSaturationThreshold: number; // e.g. 0.95

  // Pillar 4: Temporal Stability (SI)
  minStabilityIndex: number; // e.g. 0.90
}

/**
 * Configuration for a calibration run.
 */
export interface CalibrationConfig extends ShardProfileConfig {
  model: string; // "dex" | "adv" | ...
  ops: number;   // operations per run
  thresholds: FourPillarThresholds;
}

/**
 * Snapshot of a single executor run under a specific shard count.
 * This is the "atom" of the calibration loop.
 */
export interface ExecutorRunSnapshot {
  model: string;
  executorName: string;
  executorKind: string; // "isa-fabric" | "solana-style" | ...

  shards: ShardCount;
  ops: number;

  wallTimeMs: number;
  vectorizationUtilization: number; // VU
  throughput: number;               // ops/sec

  // Optional: ISA Metrics core outputs (wire in later)
  beta?: number;            // β – bidirectional efficiency
  stabilityIndex?: number;  // SI – temporal stability
  stateHash?: string;       // state signature for divergence checks
  stateValid?: boolean;     // invariants satisfied?
}

/**
 * Pillar 1: Scalability result.
 */
export interface ScalabilityResult {
  ok: boolean;
  perShard: {
    shards: ShardCount;
    vu: number;    // average VU
    pass: boolean; // vu >= minScalableVU ?
  }[];
}

/**
 * Pillar 2: Saturation result.
 */
export interface SaturationResult {
  saturationShard?: ShardCount; // first shard where β < threshold
  betaThreshold: number;
  perShard: {
    shards: ShardCount;
    beta?: number;
  }[];
}

/**
 * Pillar 4: Temporal stability result.
 */
export interface TemporalStabilityResult {
  ok: boolean;
  stabilityThreshold: number;
  averageSI?: number;
  samples: {
    shards: ShardCount;
    stabilityIndex?: number;
  }[];
}

/**
 * Pillar 3: Correctness result.
 */
export interface CorrectnessResult {
  isaMaintainsCorrectness: boolean | "unknown";
  perExecutor: {
    executorKind: string;
    anyInvalidState: boolean | "unknown";
  }[];
}

/**
 * Aggregated summary of a calibration sweep across executors + shards.
 */
export interface CalibrationSummary {
  model: string;
  ops: number;
  shardProfile: ShardCount[];

  scalability: ScalabilityResult;
  saturation: SaturationResult;
  temporalStability: TemporalStabilityResult;
  correctness: CorrectnessResult;
}
