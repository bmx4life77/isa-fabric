// src/interpreter/Orchestrator.ts
import { DecisionEngine } from "../core/DecisionEngine";
import { NatSpecInterpreter, ProtocolStep } from "./NatSpecInterpreter";

export class Orchestrator {
  interpreter = new NatSpecInterpreter();
  decision = new DecisionEngine();

  planAndDecide(script: ProtocolStep[]) {
    const plan = this.interpreter.parseProtocolScript(script);
    return plan.map((p) => {
      const tags = p.tags ?? [];
      const decision = this.decision.decide(tags, { gasEstimate: 60000 });
      return { step: p, decision };
    });
  }
}
