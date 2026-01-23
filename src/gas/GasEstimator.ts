// src/gas/GasEstimator.ts
export interface GasEstimate {
  estimatedGas: number;
  confidence?: number;
}

export function estimateGas(tags: string[] = []): GasEstimate {
  // lightweight heuristic: sum tag weights
  const base = 21000;
  const tagWeights: Record<string, number> = {
    parallel: 10000,
    governance: 35000,
    multicall: 15000,
    oracle: 25000,
    "storage-intensive": 50000,
  };

  let extra = 0;
  tags.forEach(t => {
    extra += tagWeights[t] ?? 0;
  });

  const estimated = base + extra;
  return { estimatedGas: Math.ceil(estimated), confidence: 0.6 };
}
