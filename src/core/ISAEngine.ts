// src/core/ISAEngine.ts

export interface BenchmarkScenario {
  id: number;
  name: string;
  engine: string;          // e.g., "evm-baseline", "isa-fabric"
  parallelOps: number;     // number of logical ops / txns
  availableShards: number; // shard / lane count
  notes?: string;
}

export interface BenchmarkResult {
  scenarioId: number;
  name: string;
  engine: string;
  wallTimeMs: number;
  vectorizationUtilization: number;
  effectiveThroughput: number; // ops/sec
  timestamp: string;
}

/**
 * Core ISA metrics helper:
 * how well are we using the available parallel lanes?
 */
export function computeVectorizationUtilization(
  parallelOps: number,
  availableShards: number
): number {
  const shards = Number.isFinite(availableShards) ? availableShards : 0;
  const pOps = Number.isFinite(parallelOps) ? parallelOps : 0;

  if (shards <= 0) return 0;
  const util = Math.min(1, pOps / shards);
  return util;
}

/**
 * Minimal ISA Engine:
 * - doesn't actually touch the chain yet
 * - gives you deterministic wallTimeMs + throughput
 * - uses your ISA-style utilization heuristic
 */
export default class ISAEngine {
  async runScenario(s: BenchmarkScenario): Promise<BenchmarkResult> {
    const start = Date.now();

    // --- Simple synthetic workload ---
    const ops = Math.max(1, s.parallelOps);
    const shards = Math.max(1, s.availableShards);

    // naive model: higher shards → lower wall time
    const baseUnitMs = 0.05; // 0.05 ms per op baseline
    const wallTimeMsSim = baseUnitMs * (ops / shards) * 1000;

    // pretend to do work so wallTime isn't always 0
    // (kept cheap so it doesn't actually kill your CPU)
    let acc = 0;
    for (let i = 0; i < Math.min(ops, 10_000); i++) {
      acc += (i * 31) % 7;
    }
    // acc is unused, but we touch it so TS doesn't complain
    if (acc === -1) {
      console.log("impossible branch to keep acc live");
    }

    // use simulated wall time instead of actual Date delta
    const wallTimeMs = Math.max(1, Math.round(wallTimeMsSim));

    const util = computeVectorizationUtilization(ops, shards);
    const effectiveThroughput = Number(
      (ops / (wallTimeMs / 1000)).toFixed(2)
    ); // ops per second

    return {
      scenarioId: s.id,
      name: s.name,
      engine: s.engine,
      wallTimeMs,
      vectorizationUtilization: util,
      effectiveThroughput,
      timestamp: new Date().toISOString(),
    };
  }
}
