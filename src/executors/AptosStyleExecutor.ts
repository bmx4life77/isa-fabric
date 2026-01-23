// src/executors/AptosStyleExecutor.ts
import { Executor, Tx, ExecResult } from "./Executor";

// Simple conflict model: read/write-set overlap
function hasConflict(a: Tx, b: Tx): boolean {
  return (
    a.writes.some((w) => b.reads.includes(w) || b.writes.includes(w)) ||
    b.writes.some((w) => a.reads.includes(w))
  );
}

function applyOptimisticAptosConflicts(tx: Tx, shard: number): ExecResult {
  const baseMs = tx.opCost * 0.008; // slightly faster than EVM
  const gas = Math.round(tx.opCost * 9 + (tx.vectorizable ? -40 : 0));

  return {
    txId: tx.id,
    success: true,
    gasUsed: gas,
    shard,
    committed: true,
    execTimeMs: baseMs,
    gas,
    reads: tx.reads.length,
    writes: tx.writes.length,
    vectorizable: !!tx.vectorizable,
  };
}

export class AptosStyleExecutor implements Executor {
  name = "Aptos-style STM";
  kind: Executor["kind"] = "aptos-style";

  async executeBatch(txs: Tx[], shards: number): Promise<ExecResult[]> {
    if (shards <= 0) shards = 1;

    const committedWrites = new Set<string>();
    const results: ExecResult[] = [];

    txs.forEach((tx, i) => {
      const shard = i % shards;
      const hasWriteConflict = tx.writes.some((w) => committedWrites.has(w));

      const res = applyOptimisticAptosConflicts(tx, shard);

      // very simple conflict model: if no prior write, we "commit"
      if (!hasWriteConflict) {
        tx.writes.forEach((w) => committedWrites.add(w));
      }

      results.push(res);
    });

    return results;
  }

  execute(ops: number, shards: number) {
    if (shards <= 0) shards = 1;

    const serialMs = ops * 45;
    const wallTimeMs = serialMs / (shards * 1.8);
    const throughput = ops / (wallTimeMs / 1000);
    const vectorizationUtilization = Math.min(1, shards / 6);

    return {
      wallTimeMs,
      vectorizationUtilization,
      throughput,
    };
  }
}
