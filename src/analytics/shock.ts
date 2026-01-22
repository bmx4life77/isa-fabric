// src/analytics/shock.ts

import { MetricRecord } from "../types/AggregatedFile";

export type ShockMode = "auto" | "mid20" | "custom";

export interface ShockSpec {
  mode: ShockMode;
  len?: number;

  // custom placement
  start?: number;

  // custom knobs (deltas)
  betaDelta?: number;     // subtracts from beta (e.g. -0.06 means beta += -0.06)
  psi5Delta?: number;     // adds to psi5 (e.g. +0.18)
  vMult?: number;         // multiplies v (e.g. 3)
}

export interface ShockResult {
  series: MetricRecord[];
  applied: boolean;
  start: number;
  len: number;
  spec: ShockSpec;
}

function clamp01(x: number): number {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

function safeNum(x: any): number | undefined {
  return typeof x === "number" && Number.isFinite(x) ? x : undefined;
}

// ---- Custom spec parsing ----
// Example:
//   "start=11,len=4,beta=-0.06,psi5=0.18,vMult=3"
export function parseCustomSpec(s: string): ShockSpec {
  const parts = s.split(",").map(p => p.trim()).filter(Boolean);
  const kv: Record<string, string> = {};
  for (const p of parts) {
    const [k, v] = p.split("=").map(x => x.trim());
    if (k && v !== undefined) kv[k] = v;
  }

  const start = kv["start"] !== undefined ? Number(kv["start"]) : undefined;
  const len = kv["len"] !== undefined ? Number(kv["len"]) : undefined;

  const betaDelta = kv["beta"] !== undefined ? Number(kv["beta"]) : undefined;
  const psi5Delta = kv["psi5"] !== undefined ? Number(kv["psi5"]) : undefined;
  const vMult = kv["vMult"] !== undefined ? Number(kv["vMult"]) : undefined;

  return {
    mode: "custom",
    start: Number.isFinite(start as number) ? (start as number) : 0,
    len: Number.isFinite(len as number) ? (len as number) : 4,
    betaDelta: Number.isFinite(betaDelta as number) ? (betaDelta as number) : -0.06,
    psi5Delta: Number.isFinite(psi5Delta as number) ? (psi5Delta as number) : 0.18,
    vMult: Number.isFinite(vMult as number) ? (vMult as number) : 3,
  };
}

// ---- Auto placement score ----
// We choose a start index where:
//  - psi5 rising
//  - v rising
//  - beta falling
// so “hit where it’s already weakening”.
function autoScore(series: MetricRecord[], i: number): number {
  const prev = series[i - 1];
  const cur = series[i];

  const prevBeta = safeNum(prev?.beta);
  const curBeta = safeNum(cur?.beta);
  const prevPsi5 = safeNum(prev?.psi5);
  const curPsi5 = safeNum(cur?.psi5);
  const prevV = safeNum(prev?.v);
  const curV = safeNum(cur?.v);

  const dbeta = (curBeta !== undefined && prevBeta !== undefined) ? (curBeta - prevBeta) : 0;
  const dpsi5 = (curPsi5 !== undefined && prevPsi5 !== undefined) ? (curPsi5 - prevPsi5) : 0;
  const dv = (curV !== undefined && prevV !== undefined) ? (curV - prevV) : 0;

  // We want: beta down (negative), psi5 up (positive), v up (positive)
  // Score emphasizes those directions.
  return (-dbeta * 1.0) + (dpsi5 * 1.5) + (dv * 1.0);
}

function chooseAutoStart(series: MetricRecord[], len: number): number {
  if (series.length <= len) return 0;
  let bestIdx = 0;
  let bestScore = -Infinity;

  // start at 1 so i-1 is safe
  for (let i = 1; i <= series.length - len; i++) {
    let score = 0;
    for (let k = i; k < i + len; k++) score += autoScore(series, k);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function chooseMid20Start(series: MetricRecord[], len: number): number {
  const n = series.length;
  if (n <= len) return 0;

  // “middle 20%” means center window around mid point
  const mid = Math.floor(n / 2);
  const half = Math.floor(len / 2);
  const start = Math.max(0, Math.min(n - len, mid - half));
  return start;
}

export function applyShock(series: MetricRecord[], spec: ShockSpec): ShockResult {
  const n = series.length;
  const len = Math.max(1, Math.min(spec.len ?? 4, n));

  if (!n) {
    return { series, applied: false, start: 0, len, spec };
  }

  let start = 0;

  if (spec.mode === "auto") {
    start = chooseAutoStart(series, len);
  } else if (spec.mode === "mid20") {
    start = chooseMid20Start(series, len);
  } else {
    // custom
    start = Math.max(0, Math.min(n - len, spec.start ?? 0));
  }

  const betaDelta = spec.betaDelta ?? -0.06;
  const psi5Delta = spec.psi5Delta ?? 0.18;
  const vMult = spec.vMult ?? 3;

  const out = series.map((m, idx) => {
    if (idx < start || idx >= start + len) return m;

    const beta = safeNum(m.beta);
    const psi5 = safeNum(m.psi5);
    const v = safeNum(m.v);

    return {
      ...m,
      beta: beta !== undefined ? clamp01(beta + betaDelta) : m.beta,
      psi5: psi5 !== undefined ? clamp01(psi5 + psi5Delta) : m.psi5,
      v: v !== undefined ? (v * vMult) : m.v,
    };
  });

  return { series: out, applied: true, start, len, spec: { ...spec, len, start } };
}
