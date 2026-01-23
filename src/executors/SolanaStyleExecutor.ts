// src/executors/SolanaStyleExecutor.ts
import { Executor, Tx, ExecResult } from "./Executor";

export class SolanaStyleExecutor implements Executor {
  name = "Solana-style";
  kind: Executor["kind"] = "solana-style";

  async executeBatch(txs: Tx[], shards: number): Promise<ExecResult[]> {
    if (shards <= 0) shards = 1;

    return txs.map((tx, i) => {
      const shard = i % shards;
      const size = tx.size ?? (tx.data ? tx.data.length : 0);
      const gas = 5_000 + size; // synthetic "per-byte" cost

      return {
        txId: tx.id,
        success: true,
        gasUsed: gas,
        shard,
        committed: true,
        execTimeMs: tx.opCost * 0.008,
        gas,
        reads: tx.reads.length,
        writes: tx.writes.length,
        vectorizable: tx.vectorizable,
      };
    });
  }

  execute(ops: number, shards: number) {
    if (shards <= 0) shards = 1;

    const serialMs = ops * 40;            // slightly faster base than EVM
    const wallTimeMs = serialMs / (shards * 2); // optimistic parallelism
    const throughput = ops / (wallTimeMs / 1000);

    // crude "utilization" model – just a synthetic heuristic
    const vectorizationUtilization = Math.min(1, shards / 8);

    return {
      wallTimeMs,
      vectorizationUtilization,
      throughput,
    };
  }
}
