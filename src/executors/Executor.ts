// src/executors/Executor.ts

// A synthetic "transaction" for benchmarking / adversarial workloads
export interface Tx {
  /** Stable identifier for the logical operation */
  id: string;

  /** Abstract "work units" – used to model CPU/gas cost */
  opCost: number;

  /** State keys read by this tx (for conflict models) */
  reads: string[];

  /** State keys written by this tx (for conflict models) */
  writes: string[];

  /** Whether this tx is safe to parallelize in the ISA fabric model */
  vectorizable: boolean;

  /** Optional synthetic payload size */
  size?: number;

  /** Optional raw payload (e.g., ABI-encoded data) */
  data?: string;
}

// Result of executing a single synthetic tx
export interface ExecResult {
  txId: string;
  success: boolean;
  gasUsed: number;
  shard: number;           // logical shard or lane index

  committed: boolean;      // true if "committed" in the model
  execTimeMs: number;      // synthetic wall-clock duration
  gas: number;             // duplicate of gasUsed for convenience

  reads: number;           // number of read keys
  writes: number;          // number of write keys

  vectorizable: boolean;   // echoed from input Tx
}

// Common interface for all executor baselines
export interface Executor {
  /** Human-readable name */
  name: string;

  /** Category for comparison */
  kind: "baseline" | "isa-fabric" | "solana-style" | "aptos-style" | "sui-style";

  /**
   * Execute a batch of synthetic transactions under a given shard count.
   * This is used for adversarial / structure-aware experiments.
   */
  executeBatch(txs: Tx[], shards: number): Promise<ExecResult[]>;

  /**
   * Coarse macro-level benchmark used by the CLI:
   * given a number of operations and shards, estimate wall-time and throughput.
   */
  execute(
    ops: number,
    shards: number
  ): {
    wallTimeMs: number;
    vectorizationUtilization: number;
    throughput: number;
  };
}
