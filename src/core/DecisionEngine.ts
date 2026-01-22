// src/core/DecisionEngine.ts
import { TagBank, TagDef } from "./TagBank";

export type ExecutionDecision = {
  allowParallel: boolean;
  reason: string;
  maxConcurrency?: number;
};

export class DecisionEngine {
  // deterministic rule set
  decide(tags: string[], context: { gasEstimate?: number; reentrancyRisk?: number } = {}): ExecutionDecision {
    // default
    let allowParallel = true;
    let reasonParts: string[] = [];

    const hasReentrancyGuard = tags.includes("@security:reentrantGuard");
    const isIsolated = tags.includes("@custom:isolated");
    const isParallel = tags.includes("@custom:parallel");

    if (!isParallel) {
      allowParallel = false;
      reasonParts.push("no @custom:parallel tag");
    }

    if (!hasReentrancyGuard && !isIsolated) {
      // if no reentrancy guard and not isolated, disallow
      allowParallel = false;
      reasonParts.push("no reentrancy guard and not isolated");
    }

    // gas heuristic — if gasEstimate > threshold, recommend constrained concurrency
    const gasLimit = context.gasEstimate ?? 0;
    let maxConcurrency = undefined;
    if (gasLimit > 250_000) {
      maxConcurrency = 2;
      reasonParts.push("high gas => constrained concurrency");
    } else if (gasLimit > 80_000) {
      maxConcurrency = 4;
      reasonParts.push("moderate gas => moderate concurrency");
    } else {
      maxConcurrency = 8;
    }

    if (tags.includes("@security:reentrantGuard")) reasonParts.push("reentrancy guard present");

    return {
      allowParallel,
      reason: reasonParts.join("; ") || "default allow",
      maxConcurrency
    };
  }

  // Map tag name to TagDef (helper)
  getTagDef(tagName: string): TagDef | undefined {
    return TagBank[tagName];
  }
}
