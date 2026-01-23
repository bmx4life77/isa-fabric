// src/types/tagbank.ts

import type { SecurityTag } from "./security";

/**
 * Concurrency-related tags (NatSpec++ concurrency schema).
 */
export interface ConcurrencyTagSet {
  concurrencyStrategy?:
    | "optimistic"
    | "pessimistic"
    | "hybrid"
    | "adaptive";

  lockStrategy?:
    | "none"
    | "selective"
    | "full"
    | "read-write-locks";

  conflictResolution?:
    | "rollback"
    | "retry"
    | "reorder"
    | "abort";

  speculativeExecution?: boolean;

  conflictDetectionMethod?:
    | "bloom-filter"
    | "precise"
    | "hybrid";

  conflictTolerance?: "zero" | "low" | "medium" | "high";

  storageAccessPattern?: Array<"read" | "write" | "read-write">;

  lockGranularity?:
    | "global"
    | "contract"
    | "storage-slot"
    | "account";

  lockTimeoutMs?: number;

  deadlockPrevention?: "timeout" | "ordering" | "detection";

  maxRetries?: number;
  retryBackoff?: "linear" | "exponential" | "adaptive";

  rollbackCostGas?: number;
  rollbackScope?: "transaction" | "shard" | "global";
}

/**
 * Method-level metadata in the TagBank.
 */
export interface MethodTag {
  name: string;                 // human-readable e.g. "executeParallel"
  signature?: string;           // canonical e.g. "executeParallel(bytes[],uint256)"

  // Raw NatSpec docs (if extracted)
  natspec?: {
    notice?: string;
    dev?: string;
    params?: Record<string, string>;
    returns?: string;
  };

  // Parsed security & concurrency tags
  security?: SecurityTag;
  concurrency?: ConcurrencyTagSet;

  // Metric outputs (ISA Metrics, benchmarks, etc.)
  metrics?: {
    gasEstimate?: number;
    commitLatencyMs?: number;
    conflictRate?: number;
    shardSyncTimeMs?: number;

    // Temporal stability over time
    temporalStabilityXi?: number;

    // Optional raw history for downstream tools
    throughputSamples?: number[];
  };

  // Raw tag bag for future extensions
  rawTags?: Record<string, unknown>;
}

/**
 * Contract-level entry in the TagBank.
 */
export interface ContractTags {
  name: string;
  methods: Record<string, MethodTag>;

  // contract-level tags or metadata
  tags?: Record<string, unknown>;
}

/**
 * Full TagBank structure.
 */
export interface TagBank {
  version?: string;
  updatedAt?: string;
  contracts: Record<string, ContractTags>;
}
