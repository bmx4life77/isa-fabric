// src/core/adversarial/types.ts

export interface AdversarialInput {
  domain: string;
  rasuv: {
    R: number;
    A: number;
    S: number;
    U: number;
    V: number;
  };
  psi5?: number;
  attackVectors?: string[];
  sweeps?: number;
}

export interface DivergenceResult {
  divergenceScore: number;
  anomalies: string[];
}

export interface AttackVectorResult {
  vector: string;
  impact: number;
  notes?: string;
}

export interface SensitivitySweepResult {
  parameter: string;
  deltas: number[];
  impacts: number[];
}

export interface AdversarialResult {
  domain: string;
  divergence: DivergenceResult;
  attacks: AttackVectorResult[];
  sweeps: SensitivitySweepResult[];
  summaryScore: number;

  // Future RL/SGD hooks
  rlMetadata?: {
    reward?: number;
    policySuggestion?: string;
  };
  sgdMetadata?: {
    gradients?: Record<string, number>;
    learningRate?: number;
  };
}
