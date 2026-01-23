// src/workloads/workloadGenerator.ts

import { Tx } from "../executors/Executor";

// simple ID generator
function makeId(prefix: string, n: number) {
  return `${prefix}-${n}`;
}

// -------------------------------
// Core uniform Tx builder
// -------------------------------
function txBase(id: string, reads: string[], writes: string[], opCost: number, vectorizable: boolean): Tx {
  return {
    id,
    reads,
    writes,
    opCost,
    vectorizable
  };
}

// -------------------------------
// Specific workload types
// -------------------------------

// 1. DEX workload — light, mostly parallel
export function generateDexWorkload(count: number): Tx[] {
  const result: Tx[] = [];
  for (let i = 0; i < count; i++) {
    result.push(
      txBase(
        makeId("dex", i),
        [`u-${i}`],                 // reads
        [`b-${i % 5}`],             // writes
        120 + (i % 20),             // opCost
        true                        // vectorizable
      )
    );
  }
  return result;
}

// 2. Vector workloads — CPU-heavy computations
export function generateVecWorkload(count: number): Tx[] {
  const result: Tx[] = [];
  for (let i = 0; i < count; i++) {
    result.push(
      txBase(
        makeId("vec", i),
        [`v-${i}`],
        [`v-${i}`],
        300 + (i % 50),
        true
      )
    );
  }
  return result;
}

// 3. Heavy-write workloads — contention storms
export function generateHeavyWriteWorkload(count: number): Tx[] {
  const result: Tx[] = [];
  for (let i = 0; i < count; i++) {
    result.push(
      txBase(
        makeId("hw", i),
        [`g-${i}`],
        [`shared-slot`],       // everything writes to same slot
        500 + (i % 100),
        false
      )
    );
  }
  return result;
}

// 4. Adversarial workloads — mixed conflict patterns
export function generateAdversarialWorkload(count: number): Tx[] {
  const result: Tx[] = [];
  for (let i = 0; i < count; i++) {
    const hot = i % 7 === 0;

    result.push(
      txBase(
        makeId("adv", i),
        hot ? [`shared-read`] : [`r-${i}`],
        hot ? [`shared-write`] : [`w-${i}`],
        200 + (i % 60),
        !hot
      )
    );
  }
  return result;
}

// -------------------------------
// UNIFIED GENERATOR
// -------------------------------
export function generateWorkload(model: string, count: number): Tx[] {
  switch (model) {
    case "dex":
      return generateDexWorkload(count);
    case "vec":
      return generateVecWorkload(count);
    case "hw":
      return generateHeavyWriteWorkload(count);
    case "adv":
      return generateAdversarialWorkload(count);
    default:
      throw new Error(`Unknown workload model: ${model}`);
  }
}
