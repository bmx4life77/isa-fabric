// engine/governance/proposal_lifecycle.ts

import { GovernanceDecision, ProposalLifecycle } from "./types";

export function evaluateProposalLifecycle(
  decision: GovernanceDecision
): ProposalLifecycle {
  if (decision.emergency) {
    return { status: "emergency", decision };
  }

  if (!decision.approved) {
    return { status: "rejected", decision };
  }

  if (decision.expedited) {
    return { status: "expedited", decision };
  }

  return { status: "accepted", decision };
}
