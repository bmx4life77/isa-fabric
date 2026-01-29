import { ModulatedOutput } from "../modulation/types";

/**
 * ISA Fabric — Governance Engine
 * types.ts
 */

export interface GovernanceDecision {
  approved: boolean;
  expedited: boolean;
  emergency: boolean;

  lens: {
    reviewer: number;
    steward: number;
    emergency: number;
  };

  drift?: number;
  volatility?: number;

  reasons: string[];
}

export type ProposalStatus =
  | "accepted"
  | "rejected"
  | "expedited"
  | "emergency";

export interface ProposalLifecycle {
  status: ProposalStatus;
  decision: GovernanceDecision;
}

export interface Thresholds {
  psi5_max: number;
  SE_min: number;
}
