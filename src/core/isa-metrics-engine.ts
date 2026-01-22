// src/core/isa-metrics-engine.ts
// SPDX-License-Identifier: MIT
// ISA Rebellion Metrics — TypeScript Model
// Provides BaseMetric and concrete metric implementations + orchestrator
// Usage: instantiate ISAEngine and call computeFromBenchmark(benchmarkData)

export type BenchmarkData = {
  contractName?: string;
  contractAddress?: string;
  method?: string;
  executionTimesMs: number[]; // ms per invocation
  gasUsed: number[]; // gas per invocation
  parallelOperations?: number; // number of parallel ops attempted
  submittedInputs?: number; // how many txn/ops submitted
  confirmedOutputs?: number; // how many completed/confirmed outputs
  activeShards?: number;
  availableShards?: number;
  gasForCoreOps?: number; // estimate of gas spent on core ops vs scaffolding
  totalGas?: number; // total gas for the run
  tagScores?: Record<string, number>; // optional: score from TagBank per method
  securitySignals?: {
    reentrancyGuardsPresent?: number; // count
    accessControlComplexity?: number; // heuristic score 0..1
    timelockPresent?: boolean;
    multisigPresent?: boolean;
  };
  additional?: Record<string, any>;
};

export interface BaseMetric {
  /** raw numeric (un-normalized) score or measurement */
  raw(): number;

  /** normalized into [0,1] where 1 is best */
  normalized(): number;

  /** human label */
  label(): string;

  /** optional short explanation */
  description?(): string;
}

/* -------------------------
   Concrete Metrics
   -------------------------*/

/** 1. Bidirectional Efficiency (β)
 * β = confirmedOutputs / submittedInputs
 * normalized: clamp to [0,1]
 */
export class BidirectionalEfficiency implements BaseMetric {
  constructor(private submittedInputs: number, private confirmedOutputs: number) {}
  raw(): number {
    if (this.submittedInputs <= 0) return 0;
    return this.confirmedOutputs / this.submittedInputs;
  }
  normalized(): number {
    const v = this.raw();
    return Math.max(0, Math.min(1, v));
  }
  label() { return "bidirectionalEfficiency"; }
  description() { return "Confirmed outputs / submitted inputs"; }
}

/** 2. Vectorization Utilization (V)
 * V = activeShards / availableShards
 * normalized: clamp [0,1]
 */
export class VectorizationUtilization implements BaseMetric {
  constructor(private activeShards: number, private availableShards: number) {}
  raw(): number {
    if (this.availableShards <= 0) return 0;
    return this.activeShards / this.availableShards;
  }
  normalized(): number {
    return Math.max(0, Math.min(1, this.raw()));
  }
  label() { return "vectorizationUtilization"; }
  description() { return "Active shards used / available shards"; }
}

/** 3. Intrinsic Operation Ratio (ι)
 * ι = gasForCoreOps / totalGas
 * normalized: clamp [0,1]
 */
export class IntrinsicOperationRatio implements BaseMetric {
  constructor(private gasForCoreOps: number, private totalGas: number) {}
  raw(): number {
    if (this.totalGas <= 0) return 0;
    return this.gasForCoreOps / this.totalGas;
  }
  normalized(): number {
    return Math.max(0, Math.min(1, this.raw()));
  }
  label() { return "intrinsicOperationRatio"; }
  description() { return "Gas spent on core ops / total gas"; }
}

/** 4. Fabric Integration Score (φ)
 * Composite: uses tagScores, presence of instrumentation, traceability
 * Input: tagScores (0..1 per tag), we compute mean and bonus for traceability
 */
export class FabricIntegrationScore implements BaseMetric {
  constructor(private tagScores: number[] = [], private traceabilityScore: number = 0.8) {}
  raw(): number {
    if (!this.tagScores || this.tagScores.length === 0) {
      // fallback to traceability only
      return this.traceabilityScore;
    }
    const mean = this.tagScores.reduce((a,b)=>a+b,0)/this.tagScores.length;
    // weight mean 0.8, traceability 0.2
    return mean*0.8 + this.traceabilityScore*0.2;
  }
  normalized(): number {
    return Math.max(0, Math.min(1, this.raw()));
  }
  label() { return "fabricIntegrationScore"; }
  description() { return "Tag clarity, modularity and traceability score (0..1)"; }
}

/** 5. Security Dimension Ψ₅ (psi5)
 * Aggregates discrete security signals into a 0..1 score
 * Heuristic: reentrancy guard presence, access control complexity (0..1), timelock, multisig
 */
export class SecurityDimensionPsi5 implements BaseMetric {
  constructor(private signals: {
    reentrancyGuardsPresent?: number;
    accessControlComplexity?: number; // 0..1 where 1 is complex/strong
    timelockPresent?: boolean;
    multisigPresent?: boolean;
  } = {}) {}
  raw(): number {
    const g = this.signals;
    const r = Math.min(1, (g.reentrancyGuardsPresent || 0) * 0.25); // bonus per guard
    const a = typeof g.accessControlComplexity === 'number' ? g.accessControlComplexity : 0.5;
    const t = g.timelockPresent ? 0.9 : 0.6;
    const m = g.multisigPresent ? 0.9 : 0.6;
    // weighted: access control 0.4, timelock 0.2, multisig 0.2, reentrancy 0.2
    return Math.max(0, Math.min(1, a*0.4 + t*0.2 + m*0.2 + r*0.2));
  }
  normalized(): number { return this.raw(); }
  label() { return "securityDimensionPsi5"; }
  description() { return "Aggregated security posture score (0..1)"; }
}

/** 6. Entropy / Equilibrium Factor Ξ
 * Measures system's stability vs. volatility.
 * Heuristics used:
 *  - variance(executionTimes) (lower variance -> more stable)
 *  - rollbackRate = (submitted - confirmed) / submitted
 *  - conflictRate estimate = 1 - beta
 *
 * We'll normalize each subcomponent and combine.
 */
export class EntropyEquilibrium implements BaseMetric {
  constructor(private executionTimes: number[], private submitted: number, private confirmed: number) {}
  private variance(arr: number[]) {
    if (!arr || arr.length === 0) return 0;
    const mean = arr.reduce((a,b)=>a+b,0)/arr.length;
    return arr.reduce((a,b)=>a + (b-mean)*(b-mean),0)/arr.length;
  }
  raw(): number {
    // map variance to 0..1 with a heuristic: small variance => 1, large variance => 0
    const varMs = this.variance(this.executionTimes);
    // pick a cap (e.g., 10,000 ms^2) to normalize — adjustable
    const varCap = 10000;
    const stability = 1 - Math.min(1, varMs / varCap); // 1 best
    const rollbackRate = this.submitted <= 0 ? 0 : (this.submitted - this.confirmed) / this.submitted; // 0..1
    const conflictEstimate = rollbackRate;
    // combine: stability weight 0.6, conflict/rollback 0.4 invert
    return Math.max(0, Math.min(1, stability*0.6 + (1 - conflictEstimate)*0.4));
  }
  normalized(): number { return this.raw(); }
  label() { return "entropyEquilibrium"; }
  description() { return "System equilibrium score: stability vs rollback/conflict risk"; }
}

/* -------------------------
   ISA Engine — aggregator
   -------------------------*/

export type ISAWeights = {
  beta?: number;
  vectorization?: number;
  intrinsic?: number;
  fabric?: number;
  security?: number;
  entropy?: number;
};

export type ISAReport = {
  computedAt: string;
  metrics: {
    bidirectionalEfficiency: number;
    vectorizationUtilization: number;
    intrinsicOperationRatio: number;
    fabricIntegrationScore: number;
    securityDimensionPsi5: number;
    entropyEquilibrium: number;
  };
  isaIndex: number; // aggregated composite [0..1]
  classification: string; // e.g., 'experimental' | 'production' | 'industrial-grade'
  details?: any; // any extra debug data
};

export class ISAEngine {
  weights: Required<ISAWeights>;

  constructor(weights?: ISAWeights) {
    // default weights (sum to 1)
    this.weights = {
      beta: weights?.beta ?? 0.18,
      vectorization: weights?.vectorization ?? 0.18,
      intrinsic: weights?.intrinsic ?? 0.18,
      fabric: weights?.fabric ?? 0.15,
      security: weights?.security ?? 0.16,
      entropy: weights?.entropy ?? 0.15
    };
    // Normalize weights so they sum to 1 robustly
    const total = Object.values(this.weights).reduce((a,b)=>a+b,0);
    for (const k of Object.keys(this.weights) as (keyof ISAWeights)[]) {
      this.weights[k] = +(this.weights[k]! / total).toFixed(6);
    }
  }

  computeFromBenchmark(b: BenchmarkData): ISAReport {
    const submitted = b.submittedInputs ?? (b.parallelOperations ?? 0);
    const confirmed = b.confirmedOutputs ?? submitted;
    const activeShards = b.activeShards ?? 0;
    const availableShards = b.availableShards ?? Math.max(1, activeShards || 1);
    const gasForCore = b.gasForCoreOps ?? 0;
    const totalGas = b.totalGas ?? (b.gasUsed && b.gasUsed.length ? b.gasUsed.reduce((a,n)=>a+n,0) : 0);
    const tagArray = b.tagScores ? Object.values(b.tagScores) : [];
    const securitySignals = b.securitySignals ?? {};

    const betaMetric = new BidirectionalEfficiency(submitted, confirmed);
    const vMetric = new VectorizationUtilization(activeShards, availableShards);
    const iMetric = new IntrinsicOperationRatio(gasForCore, totalGas);
    const phiMetric = new FabricIntegrationScore(tagArray, 0.85);
    const psiMetric = new SecurityDimensionPsi5(securitySignals);
    const xiMetric = new EntropyEquilibrium(b.executionTimesMs || [], submitted, confirmed);

    const beta = betaMetric.normalized();
    const vector = vMetric.normalized();
    const intrinsic = iMetric.normalized();
    const fabric = phiMetric.normalized();
    const security = psiMetric.normalized();
    const entropy = xiMetric.normalized();

    // Weighted aggregation
    const isaIndex =
      beta * this.weights.beta +
      vector * this.weights.vectorization +
      intrinsic * this.weights.intrinsic +
      fabric * this.weights.fabric +
      security * this.weights.security +
      entropy * this.weights.entropy;

    // Classification heuristic
    const classification =
      isaIndex >= 0.9 ? "industrial-grade" :
      isaIndex >= 0.75 ? "production-ready" :
      isaIndex >= 0.5 ? "experimental" : "research-prototype";

    const details = {
      raw: {
        betaRaw: betaMetric.raw(),
        vectorRaw: vMetric.raw(),
        intrinsicRaw: iMetric.raw(),
        fabricRaw: phiMetric.raw(),
        securityRaw: psiMetric.raw(),
        entropyRaw: xiMetric.raw()
      },
      weights: this.weights,
      inputSummary: {
        submitted, confirmed, activeShards, availableShards, gasForCore, totalGas
      }
    };

    return {
      computedAt: new Date().toISOString(),
      metrics: {
        bidirectionalEfficiency: round(beta),
        vectorizationUtilization: round(vector),
        intrinsicOperationRatio: round(intrinsic),
        fabricIntegrationScore: round(fabric),
        securityDimensionPsi5: round(security),
        entropyEquilibrium: round(entropy)
      },
      isaIndex: round(isaIndex),
      classification,
      details
    };
  }
}

/* -------------------------
   Utilities
   -------------------------*/

function round(n: number, digits = 4) {
  return Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits);
}

/* -------------------------
   Example helper (usage)
   -------------------------*/
export function exampleUsage() {
  const engine = new ISAEngine();
  const sample: BenchmarkData = {
    contractName: "ParallelExecutionFabric",
    contractAddress: "0xDEADBEEF",
    method: "executeParallel",
    executionTimesMs: [9, 10, 8, 11, 9],
    gasUsed: [25320, 25200, 26000, 25100],
    parallelOperations: 3,
    submittedInputs: 100,
    confirmedOutputs: 98,
    activeShards: 6,
    availableShards: 8,
    gasForCoreOps: 65000,
    totalGas: 89385,
    tagScores: { "parallel": 1, "benchmark": 0.9 },
    securitySignals: { reentrancyGuardsPresent: 1, accessControlComplexity: 0.9, timelockPresent: true, multisigPresent: true }
  };

  const report = engine.computeFromBenchmark(sample);
  // report is serializable to JSON and ready to be appended to your benchmark outputs
  return report;
}
