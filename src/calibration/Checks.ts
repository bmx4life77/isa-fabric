// src/calibration/Checks.ts

import {
  CalibrationConfig,
  CalibrationSummary,
  CorrectnessResult,
  ExecutorRunSnapshot,
  SaturationResult,
  ScalabilityResult,
  TemporalStabilityResult,
} from "./CalibrationTypes";

/**
 * Pillar 1: Scalability — does VU remain high as shards increase?
 */
export function evaluateScalability(
  snapshots: ExecutorRunSnapshot[],
  cfg: CalibrationConfig
): ScalabilityResult {
  const isaRuns = snapshots.filter((s) => s.executorKind === "isa-fabric");

  const perShard = cfg.shardProfile.map((shards) => {
    const runs = isaRuns.filter((s) => s.shards === shards);
    const vu =
      runs.length > 0
        ? runs.reduce((sum, r) => sum + r.vectorizationUtilization, 0) /
          runs.length
        : NaN;

    const pass = !Number.isNaN(vu) && vu >= cfg.thresholds.minScalableVU;

    return { shards, vu, pass };
  });

  const ok = perShard.every((entry) =>
    Number.isNaN(entry.vu) ? true : entry.pass
  );

  return { ok, perShard };
}

/**
 * Pillar 2: Saturation — where does β fall below the target?
 */
export function evaluateSaturation(
  snapshots: ExecutorRunSnapshot[],
  cfg: CalibrationConfig
): SaturationResult {
  const isaRuns = snapshots.filter((s) => s.executorKind === "isa-fabric");

  const perShard = cfg.shardProfile.map((shards) => {
    const runs = isaRuns.filter((s) => s.shards === shards);
    const beta = avgDefined(runs.map((r) => r.beta));
    return { shards, beta };
  });

  const betaThreshold = cfg.thresholds.betaSaturationThreshold;
  let saturationShard: number | undefined = undefined;

  for (const entry of perShard) {
    if (
      typeof entry.beta === "number" &&
      entry.beta < betaThreshold &&
      saturationShard === undefined
    ) {
      saturationShard = entry.shards;
    }
  }

  return { saturationShard, betaThreshold, perShard };
}

/**
 * Pillar 3: Correctness — does ISA stay correct while baselines fail?
 */
export function evaluateCorrectness(
  snapshots: ExecutorRunSnapshot[]
): CorrectnessResult {
  const byKind = groupBy(snapshots, (s) => s.executorKind);

  const perExecutor = Object.entries(byKind).map(([kind, runs]) => {
    const anyFlaggedFalse = runs.some((r) => r.stateValid === false);
    const anyKnown = runs.some((r) => typeof r.stateValid === "boolean");

    return {
      executorKind: kind,
      anyInvalidState: anyKnown ? anyFlaggedFalse : ("unknown" as const),
    };
  });

  const isaEntry = perExecutor.find((e) => e.executorKind === "isa-fabric");
  const solEntry = perExecutor.find(
    (e) => e.executorKind === "solana-style"
  );

  let isaMaintainsCorrectness: boolean | "unknown" = "unknown";

  if (
    isaEntry &&
    solEntry &&
    typeof isaEntry.anyInvalidState === "boolean" &&
    typeof solEntry.anyInvalidState === "boolean"
  ) {
    isaMaintainsCorrectness =
      isaEntry.anyInvalidState === false &&
      solEntry.anyInvalidState === true;
  }

  return { isaMaintainsCorrectness, perExecutor };
}

/**
 * Pillar 4: Temporal Stability — does SI remain healthy under load?
 */
export function evaluateTemporalStability(
  snapshots: ExecutorRunSnapshot[],
  cfg: CalibrationConfig
): TemporalStabilityResult {
  const isaRuns = snapshots.filter((s) => s.executorKind === "isa-fabric");

  const samples = cfg.shardProfile.map((shards) => {
    const runs = isaRuns.filter((s) => s.shards === shards);
    const si = avgDefined(runs.map((r) => r.stabilityIndex));
    return { shards, stabilityIndex: si };
  });

  const allSI = samples
    .map((s) => s.stabilityIndex)
    .filter((v): v is number => typeof v === "number");

  const averageSI =
    allSI.length > 0
      ? allSI.reduce((sum, v) => sum + v, 0) / allSI.length
      : undefined;

  const ok =
    averageSI === undefined ||
    averageSI >= cfg.thresholds.minStabilityIndex;

  return {
    ok,
    stabilityThreshold: cfg.thresholds.minStabilityIndex,
    averageSI,
    samples,
  };
}

/**
 * Aggregate all Four Pillars into a CalibrationSummary.
 */
export function buildCalibrationSummary(
  snapshots: ExecutorRunSnapshot[],
  cfg: CalibrationConfig
): CalibrationSummary {
  const scalability = evaluateScalability(snapshots, cfg);
  const saturation = evaluateSaturation(snapshots, cfg);
  const temporalStability = evaluateTemporalStability(snapshots, cfg);
  const correctness = evaluateCorrectness(snapshots);

  return {
    model: cfg.model,
    ops: cfg.ops,
    shardProfile: cfg.shardProfile,
    scalability,
    saturation,
    temporalStability,
    correctness,
  };
}

// -------- helpers --------

function avgDefined(values: Array<number | undefined>): number | undefined {
  const filtered = values.filter(
    (v): v is number => typeof v === "number"
  );
  if (filtered.length === 0) return undefined;
  return filtered.reduce((sum, v) => sum + v, 0) / filtered.length;
}

function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (t: T) => K
): Record<K, T[]> {
  const out = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
}
