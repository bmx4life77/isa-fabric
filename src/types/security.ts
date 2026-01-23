// src/types/security.ts
/**
 * Security-related types used across NatSpec++ Fabric.
 * Purpose: allow deterministic parallelization checks, security profiling,
 * and enable ISA metrics & validators to reason about method properties.
 */

/** Reentrancy posture for a method */
export type ReentrancyKind = 'none' | 'check-effects' | 'guarded';

/** UUPS / Diamond upgrade-safety metadata */
export interface UpgradeSafeTag {
  authorizeUpgrade?: boolean;
  storageGap?: boolean;
  initializerPresent?: boolean;

  // Optional extended metadata
  version?: string;                  // semantic version of upgrade logic
  auditedBy?: string | null;         // e.g. "AuditFirmName / report-id"
}

/**
 * State access signature used by parallelization logic and ISA metrics.
 * "reads" and "writes" are symbolic descriptors (strings) produced by
 * static analysis or manual annotation (e.g. "balances[msg.sender]").
 */
export interface StateAccessSignature {
  reads: string[];                   // symbolic read-access patterns
  writes: string[];                  // symbolic write-access patterns
  storageSlots?: number[];           // optional numeric storage slots if known
}

/** Call graph data useful for cascade/reentrancy analysis */
export interface CallGraphInfo {
  internalCalls?: string[];          // internal function selectors/names
  externalCalls?: string[];          // external contract names/address selectors
  oracleCalls?: string[];            // names/identifiers of oracles called
}

/** Results/metadata returned from automated security tools */
export interface SecurityTestResults {
  slither?: 'pass' | 'warn' | 'fail';
  fuzzCoverage?: number;             // 0..1
  audit?: string | null;             // audit id/date or null
  formal?: boolean;                  // formal verification present?
  notes?: string;
}

/** Primary method-level security descriptor */
export interface SecurityTag {
  /** reentrancy posture */
  reentrancy?: ReentrancyKind;

  /** access control descriptor: "role:ADMIN" | "onlyOwner" | "none" | "multisig" */
  access?: string;

  /** high-impact method touching treasury/supply/admin */
  critical?: boolean;

  /** guarded by timelock */
  timelock?: boolean;

  /** upgrade-safety metadata for upgradeable patterns (UUPS / Diamond / etc.) */
  upgradeSafe?: UpgradeSafeTag;

  /** state access signature to determine parallelizability */
  stateAccess?: StateAccessSignature;

  /** call graph / external-interaction metadata */
  callGraph?: CallGraphInfo;

  /** results from static/dynamic security tools */
  tests?: SecurityTestResults;

  /** free-form developer notes */
  notes?: string;
}
