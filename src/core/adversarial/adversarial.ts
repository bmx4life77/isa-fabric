// src/core/adversarial/adversarial.ts

/**
 * Main Adversarial Engine Orchestrator
 *
 * This module ties together:
 * - divergence detection
 * - attack vector simulation
 * - differential execution
 * - sensitivity sweeps
 * - summary scoring
 *
 * It also exposes RL- and SGD-ready metadata so that future
 * reinforcement learning agents or gradient optimizers can
 * tune system parameters automatically.
 */

import {
  AdversarialInput,
  AdversarialResult,
} from "./types";

import { detectDivergence } from "./divergence-detector";
import { simulateAttackVectors } from "./attack-vectors";
import { runDifferentialExecution } from "./differential-executor";
import { runSensitivitySweeps } from "./sensitivity-sweeper";
import { checkStateDivergence } from "./state-divergence-checker";

/**
 * Run a full adversarial simulation.
 *
 * This is the core entrypoint used by:
 * - CLI (`isa adversarial run`)
 * - GCS calibration
 * - future RL agents
 * - future SGD optimizers
 */
export function runAdversarialSimulation(
  input: AdversarialInput
): AdversarialResult {
  const { domain, rasuv, psi5, attackVectors, sweeps } = input;

  // 1. Divergence analysis
  const divergence = detectDivergence(rasuv);

  // 2. Attack vector simulation
  const attacks = simulateAttackVectors(
    attackVectors ?? [],
    psi5 ?? 0.9
  );

  // 3. Sensitivity sweeps (±5% random perturbations)
  const sweepResults = runSensitivitySweeps(
    rasuv,
    sweeps ?? 3
  );

  // 4. Differential execution instability
  const diffInstability = runDifferentialExecution(domain, rasuv);

  // 5. Summary score (0–1)
  const summaryScore =
    (1 - divergence.divergenceScore) * 0.5 +
    (1 - diffInstability) * 0.3 +
    (1 - averageAttackImpact(attacks)) * 0.2;

  // 6. RL + SGD metadata (future integrations)
  const rlMetadata = {
    reward: summaryScore,
    policySuggestion:
      summaryScore < 0.6
        ? "Increase ψ₅ or reduce state surface (S)"
        : "Maintain current configuration",
  };

  const sgdMetadata = {
    gradients: {
      S: -(divergence.divergenceScore * 0.4),
      U: -(divergence.divergenceScore * 0.3),
      V: -(divergence.divergenceScore * 0.3),
    },
    learningRate: 0.01,
  };

  return {
    domain,
    divergence,
    attacks,
    sweeps: sweepResults,
    summaryScore,
    rlMetadata,
    sgdMetadata,
  };
}

/**
 * Compute average attack impact.
 */
function averageAttackImpact(attacks: { impact: number }[]): number {
  if (attacks.length === 0) return 0;
  return (
    attacks.reduce((sum, a) => sum + a.impact, 0) / attacks.length
  );
}
