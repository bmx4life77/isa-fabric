// src/executors/IsaFabricExecutor.ts
import { Executor, Tx, ExecResult } from "./Executor";
import { computeVectorizationUtilization } from "../core";

export class IsaFabricExecutor implements Executor {
  name = "ISA Fabric";
  kind: Executor["kind"] = "isa-fabric";

  async executeBatch(txs: Tx[], shards: number): Promise<ExecResult[]> {
    if (shards <= 0) shards = 1;

    return txs.map((tx, i) => {
      const shard = i % shards;
      const baseGas = 21_000;
      const opGas = tx.opCost * 10;
      const gas = baseGas + opGas;

      return {
        txId: tx.id,
        success: true,
        gasUsed: gas,
        shard,
        committed: true,
        execTimeMs: tx.opCost * 0.01, // arbitrary synthetic scaling
        gas,
        reads: tx.reads.length,
        writes: tx.writes.length,
        vectorizable: tx.vectorizable,
      };
    });
  }

  execute(ops: number, shards: number) {
    if (shards <= 0) shards = 1;

    // serial baseline: 50 ms per op
    const serialMs = ops * 50;

    // ideal parallel: divide by shard count
    const idealParallelMs = serialMs / shards;

    const util = computeVectorizationUtilization(ops, shards);

    // worse if utilization < 1
    const wallTimeMs = idealParallelMs / Math.max(util, 0.25);
    const throughput = ops / (wallTimeMs / 1000);

    return {
      wallTimeMs,
      vectorizationUtilization: util,
      throughput,
    };
  }
}
