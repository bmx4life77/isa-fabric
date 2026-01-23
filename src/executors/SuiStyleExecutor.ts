// src/executors/SuiStyleExecutor.ts
import { Executor, Tx, ExecResult } from "./Executor";

function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return h;
}

function ownerKey(tx: Tx): string {
  if (tx.writes.length > 0) return tx.writes[0];
  if (tx.reads.length > 0) return tx.reads[0];
  return tx.id;
}

function suiLikeExec(tx: Tx, shard: number): ExecResult {
  const baseMs = tx.opCost * 0.009;
  const gas = Math.round(tx.opCost * 9.5 + (tx.vectorizable ? -45 : 0));

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

export class SuiStyleExecutor implements Executor {
  name = "Sui-style object graph";
  kind: Executor["kind"] = "sui-style";

  async executeBatch(txs: Tx[], shards: number): Promise<ExecResult[]> {
    if (shards <= 0) shards = 1;

    // Group txs by a synthetic "owner" to mimic Sui’s object routing
    const buckets = new Map<number, Tx[]>();

    txs.forEach((tx) => {
      const owner = ownerKey(tx);
      const shardIndex = Math.abs(simpleHash(owner)) % shards;
      const arr = buckets.get(shardIndex) ?? [];
      arr.push(tx);
      buckets.set(shardIndex, arr);
    });

    const results: ExecResult[] = [];
    for (const [shardIndex, bucket] of buckets.entries()) {
      for (const tx of bucket) {
        results.push(suiLikeExec(tx, shardIndex));
      }
    }

    return results;
  }

  execute(ops: number, shards: number) {
    if (shards <= 0) shards = 1;

    const serialMs = ops * 48;
    const wallTimeMs = serialMs / (shards * 1.7);
    const throughput = ops / (wallTimeMs / 1000);
    const vectorizationUtilization = Math.min(1, shards / 5);

    return {
      wallTimeMs,
      vectorizationUtilization,
      throughput,
    };
  }
}
