// src/calibration/CalibrationLoop.ts

import type { Executor } from "../executors/Executor";
import {
  CalibrationConfig,
  CalibrationSummary,
  ExecutorRunSnapshot,
} from "./CalibrationTypes";
import { buildCalibrationSummary } from "./Checks";

/**
 * Run a calibration sweep for a single executor across the shard profile.
 */
export function runCalibrationForExecutor(
  executor: Executor,
  cfg: CalibrationConfig
): { snapshots: ExecutorRunSnapshot[]; summary: CalibrationSummary } {
  const snapshots: ExecutorRunSnapshot[] = [];

  for (const shards of cfg.shardProfile) {
    const { wallTimeMs, vectorizationUtilization, throughput } =
      executor.execute(cfg.ops, shards);

    const snapshot: ExecutorRunSnapshot = {
      model: cfg.model,
      executorName: executor.name,
      executorKind: executor.kind,
      shards,
      ops: cfg.ops,
      wallTimeMs,
      vectorizationUtilization,
      throughput,
      // beta, stabilityIndex, stateValid, etc. can be wired in here later
    };

    snapshots.push(snapshot);
  }

  const summary = buildCalibrationSummary(snapshots, cfg);
  return { snapshots, summary };
}

/**
 * Run calibration across all executors (ISA + baselines),
 * aggregating into a single Four-Pillars summary.
 */
export function runCalibrationForExecutors(
  executors: Executor[],
  cfg: CalibrationConfig
): { snapshots: ExecutorRunSnapshot[]; summary: CalibrationSummary } {
  const allSnapshots: ExecutorRunSnapshot[] = [];

  for (const ex of executors) {
    const { snapshots } = runCalibrationForExecutor(ex, cfg);
    allSnapshots.push(...snapshots);
  }

  const summary = buildCalibrationSummary(allSnapshots, cfg);
  return { snapshots: allSnapshots, summary };
}
