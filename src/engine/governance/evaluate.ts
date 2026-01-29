/**
 * ISA Fabric — Governance Engine
 * evaluate.ts
 */

import { ModulatedOutput } from "../modulation/types";
import { loadLensProfiles } from "./lens_profiles";
import { checkThresholds } from "./thresholds";
import { GovernanceDecision } from "./types";

export function evaluateGovernance(
  modulated: ModulatedOutput
): GovernanceDecision {
  const reasons = checkThresholds({
    psi5: modulated.psi5,
    SE: modulated.SE,
  });

  const lenses = loadLensProfiles();

  const reviewerScore =
    modulated.SE * lenses.reviewer.weight_SE +
    modulated.confidenceAdjustedSE * lenses.reviewer.weight_confidence;

  const stewardScore =
    modulated.SE * lenses.steward.weight_SE +
    modulated.drift * lenses.steward.weight_drift;

  const emergencyScore =
    modulated.psi5 * lenses.emergency.weight_psi5 +
    modulated.volatility * lenses.emergency.weight_volatility;

  const approved = reasons.length === 0;
  const expedited = approved && reviewerScore > 0.8;
  const emergency = emergencyScore > 1.2;

  return {
    approved,
    expedited,
    emergency,
    lens: {
      reviewer: reviewerScore,
      steward: stewardScore,
      emergency: emergencyScore,
    },
    drift: modulated.drift,
    volatility: modulated.volatility,
    reasons,
  };
}
