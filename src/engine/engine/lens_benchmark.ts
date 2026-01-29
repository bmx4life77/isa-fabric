/**
 * ISA Fabric — Lens Benchmarking Engine
 *
 * Runs governance evaluation across multiple scenarios
 * and compares reviewer, steward, and emergency lens behavior.
 */

import { loadBenchmarkScenarios } from "./load_scenarios";
import { modulateMetrics } from "../modulation/modulate";
import { evaluateGovernance } from "../governance/evaluate";

export function runLensBenchmark() {
  const scenarios = loadBenchmarkScenarios();

  const results = scenarios.map((scenario) => {
    const metrics = {
      psi5: scenario.psi5,
      SE: scenario.SE,
      drift: scenario.drift,
      volatility: scenario.volatility,
      beta: 0,
      VU: 0,
      iota: 0,
      phi: 0,
    };

    const modulated = modulateMetrics(metrics);
    const decision = evaluateGovernance(modulated as any);

    return {
      scenario: scenario.name,
      lens: decision.lens,
      approved: decision.approved,
      expedited: decision.expedited,
      emergency: decision.emergency,
    };
  });

  return results;
}
