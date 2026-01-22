// src/benchmarking/envelope.ts
import type { Dataset } from "./schema";
import type { LensScores } from "./metrics";

export type Envelope = {
  version: string;
  createdAt: string;
  domain: string;
  name: string;
  metrics: {
    beta: number;
    vu: number;
    iota: number;
    phi: number;
    psi5: number;
  };
  input: {
    pointCount: number;
    timeRange?: {
      start: string;
      end: string;
    };
  };
  insights: string[];
};

export function buildEnvelope(
  dataset: Dataset,
  scores: LensScores,
  insights: string[]
): Envelope {
  const timestamps = dataset.points.map(p => p.timestamp);
  const sorted = [...timestamps].sort();
  const start = sorted[0];
  const end = sorted[sorted.length - 1];

  return {
    version: "0.1.0",
    createdAt: new Date().toISOString(),
    domain: dataset.domain,
    name: dataset.name,
    metrics: {
      beta: scores.beta,
      vu: scores.vu,
      iota: scores.iota,
      phi: scores.phi,
      psi5: scores.psi5,
    },
    input: {
      pointCount: dataset.points.length,
      timeRange: { start, end },
    },
    insights,
  };
}
