// src/interpreter/NatSpecInterpreter.ts
import { TagBank } from "../core/TagBank";

export type ProtocolStep = {
  facet: string;
  method: string;
  params: any[];
  tags?: string[];
};

export class NatSpecInterpreter {
  parseProtocolScript(script: ProtocolStep[]) {
    // extract tags & build execution plan (very small example)
    return script.map((step, idx) => ({
      id: `step-${idx}`,
      facet: step.facet,
      method: step.method,
      params: step.params,
      tags: step.tags ?? []
    }));
  }

  // Validate tags exist in TagBank
  validateTags(step: ProtocolStep) {
    const unknown = (step.tags ?? []).filter((t) => !TagBank[t]);
    return { unknown, valid: unknown.length === 0 };
  }
}
