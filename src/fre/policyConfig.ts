// src/fre/policyConfig.ts
export const POLICY = {
  beta: {
    strongDown: -0.005,
    mildDown: -0.002,
  },
  sigma: {
    red: 0.08,
    yellow: 0.04,
  },
  spectral: {
    highRegularity: 0.92,
  },
} as const;
