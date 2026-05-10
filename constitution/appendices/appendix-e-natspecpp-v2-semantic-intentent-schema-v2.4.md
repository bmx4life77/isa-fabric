### **Appendix E – NatSpec++ v2 Semantic Intent Schema**

**Appendix E – NatSpec++ v2 Semantic Intent Schema**  
**Version:** v2.4  
**Status:** Canonical, Sealed under CUAP and BEP  
**Cross-references:** Article XI (Operator Loading), Article XVIII (NatSpec++ Compliance Maxim), Article XXVIII (Event-Driven Execution), Appendix D (Execution Envelope)

**E.1 Purpose**  
NatSpec++ v2 is the **sole semantic law** of ISA Fabric. It provides structured, machine-readable annotations that declare intent, safety requirements, envelope hints, and constitutional constraints for every operator and execution.

**E.2 Core Rules (Immutable)**

E.2.1 All annotations SHALL use **kebab-case** only. CamelCase, chained annotations, and non-standard formatting are prohibited.  
E.2.2 Every operator and execution plan MUST carry a valid `@intent` block.  
E.2.3 NatSpec++ SHALL be parsed by the canonical TagBank and validated by FRE before envelope classification.

**E.3 Canonical SemanticIntent Structure**

```json
{
  "intent": {
    "type": "read | write | mutate | query | enforce | analyze",
    "scope": "local | lineage | system | cross-system",
    "suggestedEnvelope": { "P": 0-3, "S": 0-3, "E": 0-3 },
    "forceConservative": boolean,
    "riskBand": "green | yellow | red | critical",
    "requires": ["list of invariants"],
    "affects": ["list of invariants or domains"]
  },
  "security": {
    "psi5Min": number,
    "seMin": number,
    "xiScalarMin": number
  },
  "tags": ["kebab-case", "tags"]
}
```

**E.4 TagBank Integration**  
All tags SHALL be resolved against the sealed TagBank. Unknown or forbidden tags SHALL cause rejection and conservative mode.

**E.5 Sealing Clause**  
This appendix and the NatSpec++ v2 schema are immutable except through full BEP ratification. Any deviation from kebab-case or schema rules is a constitutional violation.