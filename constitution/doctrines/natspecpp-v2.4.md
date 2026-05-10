# **NatSpec++ v2 Semantic Intent Schema**  
### *Canonical for ISA Fabric v6.0*

**Status:** Canonical – Ready for BEP-v6-007  
**Version:** v2.4 
**Supersedes:** NatSpec++ v2.3
**Depends on:**  
- Execution Envelope Specification v1.6  
- Unified Embedding Doctrine v0.6  
- Quantum Alignment Extensions (Articles 4.5 & 4.6)  
- Security Posture Metric Formalization (ψ₅)  
- Societal Telemetry Doctrine (Article XXX)  
- TagBank as single source of truth

**SHA-256:** *6d9174fdcd99e1fce9d231e84f92564fe365adebacf69ccd24ec9cc11d3764b0
---

## **Section 1 — Purpose and Role (Expanded & Canonical)**

NatSpec++ v2 is the executable semantic layer of ISA Fabric v6.0. It transforms human-readable 
documentation and developer intent into machine-verifiable, governance-aware metadata 
that directly informs and constrains every execution plan.

It serves as the constitutional bridge between human intention and the deterministic runtime of the 
unified manifold Σ(t). Through structured semantic categories grounded in the canonical 
TagBank, NatSpec++ v2 ensures that intent is explicit, auditable, and enforceable at the point of classification 
by the Execution Envelope.

Core Objectives

  *Semantic Intent Capture — Make developer intent (concurrency, security, governance, resource, observability, envelope hints, quantum annotations, and societal flags) explicit and machine-actionable.

  * TagBank Grounding — All tags MUST resolve against the canonical TagBank; unresolved or invalid tags force the safest envelope (P0/S0/E0).

  * Envelope Integration — Parsed semantic intent directly influences the (P, S, E) triple and feeds the ISA Metrics Engine.

  * Replay & BIV Verifiability — Every parsed SemanticIntent object is sealed into the Replay-Verifiable Execution Plan record for exact recomputation and non-regression.

  * Quantum & Societal Awareness — Provides non-authoritative annotations for interpretive foresight while strictly respecting the Separation Doctrine (Article 0.5) and Quantum      Alignment Extensions (Articles 4.5 & 4.6).

NatSpec++ v2 is mandatory. Every public/external function and every governance-sensitive action MUST carry a well-formed NatSpec++ v2 block. Absence or invalidation of semantic intent SHALL result in the safest envelope (P0/S0/E0), preventing any execution that cannot be constitutionally verified.

In short: NatSpec++ v2 turns documented intention into enforceable constitutional reality.

---

## **Section 2 — Core Structure (Canonical JSON Schema)**

```json
{
  "planId": "string",
  "version": "v1.1",
  "timestamp": "ISO 8601",
  "lineageId": "string",

  "semanticIntent": { ... },
  "envelope": { "P": 0|1|2|3, "S": 0|1|2|3, "E": 0|1|2|3 },

  "inputs": {
    "M": { ... },
    "G": { ... },
    "Q": { ... },
    "Σ(t)_hash": "string",
    "Σ_society(t)_hash": "string",
    "Σ(t)_snapshotRef": "string | null",      // optional external pointer
    "Σ_society(t)_snapshotRef": "string | null"
  },

  "thresholds": { ... },

  "executionResult": {
    "status": "success" | "reverted" | "downgraded",
    "gasUsed": number | null,
    "stateChanges": {
      "description": "Merkle root or delta summary — MUST be sufficient to reconstruct post-state from pre-state plus deltas"
    },
    "eventsEmitted": [...]
  },

  "replayMetadata": {
    "classifierVersion": "string",
    "parserVersion": "string",
    "tagBankVersion": "string",
    "replayHash": "SHA-256 of the canonical JSON serialization of the entire plan object with stable field ordering (alphabetical keys, no whitespace)"
  }
}

---

## **Section 3 — Canonical Semantic Categories**

/**
 * @title Transfer tokens between accounts
 *
 * @intent {
 *   "concurrency": {
 *     "strategy": "serialized",
 *     "threadSafe": false
 *   },
 *
 *   "security": {
 *     "reentrancy": "guarded",
 *     "access": "role:TRANSFER_ROLE",
 *     "critical": false,
 *     "timelock": false,
 *     "upgradeSafe": {
 *       "authorizeUpgrade": true,
 *       "storageGap": true,
 *       "initializerPresent": true
 *     },
 *     "tests": {
 *       "slither": "pass",
 *       "fuzzCoverage": 0.82,
 *       "audit": "2026-02-01",
 *       "formal": false
 *     }
 *   },
 *
 *   "governance": {
 *     "level": "routine",
 *     "quorum": "51%",
 *     "timelockRequired": false,
 *     "lineageImpact": "none"
 *   },
 *
 *   "observability": {
 *     "events": ["Transfer"],
 *     "metrics": ["execution_time"],
 *     "trace": false,
 *     "logLevel": "standard"
 *   },
 *
 *   "quantum": {
 *     "alignmentHint": true,
 *     "interpretiveOnly": true,
 *     "decoherenceRisk": "low"
 *   },
 *
 *   "societal": {
 *     "imsiImpact": "low",
 *     "policyFlag": null
 *   }
 * }
 */
function transfer(address to, uint256 amount) external {
    _transfer(msg.sender, to, amount);
}

### **3.1 @intent.concurrency**

{
  "strategy": "optimistic" | "pessimistic" | "hybrid" | "adaptive" | "serialized",
  "maxConcurrency": number,
  "threadSafe": boolean,
  "speculative": boolean,
  "lockStrategy": "none" | "selective" | "full" | "read-write"
}


### **3.2 @intent.security** (Mandatory for public/external)

{
  "reentrancy": "none" | "check-effects" | "guarded" | "protected",
  "access": "none" | "onlyOwner" | "role:ROLE_NAME" | "multisig",
  "critical": boolean,
  "timelock": boolean,
  "upgradeSafe": {
    "authorizeUpgrade": boolean,
    "storageGap": boolean,
    "initializerPresent": boolean
  },
  "tests": {
    "slither": "pass" | "warn" | "fail",
    "fuzzCoverage": number (0..1),
    "audit": "YYYY-MM-DD" | null,
    "formal": boolean
  }
}


### **3.3 @intent.governance**

{
  "level": "routine" | "enhanced" | "critical" | "root",
  "quorum": "51%" | "66%" | "100%" | "multisig",
  "timelockRequired": boolean,
  "lineageImpact": "none" | "read" | "write" | "mitosis"
}


### **3.4 @intent.resource**

{
  "gasOptimized": boolean,
  "gasIntensive": boolean,
  "memoryUsage": "low" | "medium" | "high" | "critical",
  "cpuIntensive": boolean,
  "ioIntensive": boolean
}


### **3.5 @intent.observability**

{
  "events": string[],
  "metrics": string[],
  "trace": boolean,
  "logLevel": "minimal" | "standard" | "detailed"
}


### **3.6 @intent.envelope** (Optional override / hint)

{
  "suggestedP": 0|1|2|3,
  "suggestedS": 0|1|2|3,
  "suggestedE": 0|1|2|3,
  "forceConservative": boolean
}

“Envelope hints are advisory only; they MAY bias DecisionEngine but SHALL NOT override forbidden combinations or classifier rules.”

### **3.7 @intent.quantum** (Non-authoritative)
```json
{
  "alignmentHint": boolean,
  "interpretiveOnly": true,
  "decoherenceRisk": "low" | "medium" | "high"
}


### **3.8 @intent.societal** (Non-authoritative)

{
  "imsiImpact": "none" | "low" | "medium" | "high",
  "policyFlag": string | null
}


**S — Semantic Intent (NatSpec++ v2)**  

The fully parsed and enriched SemanticIntent object emitted by the NatSpecInterpreter v2.x after TagBank resolution and doctrinal enrichment. This object is passed directly as input **S** to ClassifyEnvelope(...).

---

## **Section 4 — TagBank Integration & Validation Rules (Expanded & Canonical)**

**TagBank is the single source of truth** for all semantic intent in ISA Fabric v6.0. It serves as the canonical registry of every allowed tag, its definition, data type, validation rules, and doctrinal mapping. No NatSpec++ v2 block may use a tag that does not exist in the active TagBank.

### **4.1 TagBank Structure Requirements**

The canonical TagBank SHALL be a JSON object stored at a fixed repository path (e.g., `artifacts/tagbank.json`) with the following structure:

{
  "version": "v2.1",
  "lastUpdated": "YYYY-MM-DDTHH:mm:ssZ",
  "tags": {
    "parallel": {
      "type": "boolean",
      "description": "Indicates method supports parallel execution",
      "requiredFor": ["public", "external"],
      "envelopeImpact": { "P": "influences" },
      "validationRule": "must be true or false"
    },
    "security": {
      "type": "object",
      "description": "Security posture metadata",
      "requiredFor": ["public", "external", "state-mutating"],
      "schemaRef": "schemas/natspec-security.schema.json",
      "envelopeImpact": { "S": "primary driver" }
    },
    // ... all other tags
  }
}


### **4.2 Validation Process (Mandatory Steps)**

The NatSpec++ v2 parser (NatSpecInterpreter) SHALL perform the following steps in strict order before any execution plan is classified:

1. **Extraction** — Parse all `@intent.*` blocks from the NatSpec comment.
2. **Tag Resolution** — Every tag key MUST exist in the active TagBank. Unresolved tags are treated as fatal.
3. **Schema Validation** — Each tag value MUST conform to the type and validationRule defined in TagBank (including full JSON schema validation for complex objects like `@intent.security`).
4. **Doctrinal Mapping** — The parser SHALL annotate the semantic intent object with the `envelopeImpact` field from TagBank.
5. **Failure Handling**:
   - Any validation failure (missing tag, type mismatch, schema violation) SHALL cause the envelope classifier to return the safest envelope: **(P0, S0, E0)**.
   - A detailed validation error SHALL be logged to BLVDB Anima with the original source snippet.

### **4.3 Versioning & Non-Regression Guarantee**

- TagBank version SHALL be pinned in every parsed semantic intent object.
- Any change to TagBank requires a BEP and full BIV re-verification of all affected contracts.
- BIV SHALL re-parse the original source code against the sealed TagBank version and assert exact match with the stored semantic intent.

### **4.4 Example TagBank Entry (for illustration)**


"security": {
  "type": "object",
  "description": "Security posture metadata",
  "requiredFor": ["public", "external", "state-mutating"],
  "schemaRef": "schemas/natspec-security.schema.json",
  "envelopeImpact": { "S": "primary driver" },
  "validationRule": "must conform to natspec-security.schema.json"
}

---

## **Section 5 — Parser & Interpreter Requirements (Expanded & Canonical)**

The NatSpec++ v2 parser and interpreter form the **executable bridge** between source code comments and the constitutional runtime. They are responsible for turning human intent into a machine-enforceable SemanticIntent object that directly feeds the Execution Envelope classifier.

### **5.1 Core Responsibilities of the Parser/Interpreter**

The NatSpecInterpreter SHALL perform the following steps in strict, deterministic order for every function or governance action:

1. **Extraction**  
   Scan the NatSpec comment block and extract all `@intent.*` categories. The parser MUST support both single-line (`///`) and multi-line (`/** */`) NatSpec styles.

2. **Tag Resolution Against TagBank**  
   Every tag key used in any category MUST exist in the active TagBank version. Unresolved tags are treated as a fatal validation failure.

3. **Schema & Type Validation**  
   Each tag value MUST conform to the type, validationRule, and (where applicable) JSON schema defined in TagBank. Complex objects such as `@intent.security` MUST pass full JSON schema validation against `schemas/natspec-security.schema.json`.

4. **Doctrinal Mapping & Enrichment**  
   The parser SHALL enrich the semantic intent object with:
   - `envelopeImpact` metadata from TagBank
   - Computed defaults where tags are absent but required by doctrine (e.g., security block for state-mutating functions)
   - Quantum and societal annotations (non-authoritative)

5. **SemanticIntent Object Emission**  
   Output a strongly-typed, serializable SemanticIntent object containing all parsed and enriched categories.

6. **Logging to BLVDB Anima**  
   The complete parsed object, original source snippet, and validation result SHALL be sealed into BLVDB Anima as part of the Replay-Verifiable Execution Plan record.

### **5.2 Failure Modes and Enforcement**

- **Fatal Validation Failure** (missing required tag, type mismatch, schema violation, unresolved tag):  
  The interpreter SHALL immediately return a failure signal that forces the envelope classifier to produce the safest envelope: **(P0, S0, E0)**.

- **Warning-Level Issues** (optional tags missing, deprecated usage):  
  Logged to BLVDB Anima but do not force downgrade. Operators SHALL review warnings during BIV.

- **Security Block Absence** for any public/external state-mutating function:  
  Treated as fatal → forces **S0** and blocks execution until resolved.

### **5.3 Purity, Versioning, and Non-Regression Guarantees**

- The parser MUST be a **pure function**: no external I/O, no randomness, no mutable global state.
- The interpreter version (e.g., “NatSpecInterpreter-v2.2”) and the TagBank version used SHALL be recorded in every SemanticIntent object.
- Any change to the parser logic or TagBank requires a BEP and full BIV re-verification of affected contracts.
- BIV SHALL re-run the parser on the original source code against the sealed TagBank version and assert exact match with the stored SemanticIntent object.

### **5.4 Integration Points**

- The emitted SemanticIntent object is passed directly as input **S** to `ClassifyEnvelope(...)`.
- DecisionEngine uses the concurrency and governance categories to compute the Performance (P) and Security (S) axes.
- Security category directly feeds ψ₅ computation in the ISA Metrics Engine.
- Quantum and societal categories are passed as non-authoritative annotations (Q and societal flags) but cannot override the final envelope triple.
- The emitted SemanticIntent object is passed directly as input **S** to `ClassifyEnvelope(...)`.
- **@intent.envelope hints** (`suggestedP`, `suggestedS`, `suggestedE`, `forceConservative`) are **non-binding recommendations only**. 

The final envelope triple is always computed by the classifier. These hints may be used for optimization or
logging but cannot override forbidden combinations or quantum alignment rules.

---

## **Section 6 — Constitutional Guarantees (Expanded & Canonical)**

NatSpec++ v2 is not merely a documentation format — it is a **constitutional contract** between developer intent and runtime enforcement. Once parsed and validated, the resulting SemanticIntent object becomes an immutable part of the execution record and is subject to the full set of v6.0 invariants.

### **6.1 Immutability Doctrine**

- The parsed SemanticIntent object is **immutable** for the lifetime of the execution plan.  
- No engine, operator, or quantum interpretive layer may modify the parsed intent after classification.  
- Any attempt to alter the sealed SemanticIntent object is a constitutional violation and SHALL trigger immediate conservative mode (P0/S0/E0), BLVDB Anima logging, and lineage review under Article XIV.5.

### **6.2 Non-Authoritativeness of Interpretive Categories**

- Quantum and societal categories (@intent.quantum and @intent.societal) are **strictly non-authoritative**.  
- They may only provide annotations for interpretive foresight and dashboards.  
- They SHALL NOT influence the final envelope triple or override any axis (P, S, or E).  
- This enforces Articles 4.5 and 4.6 (Quantum Alignment Invariant and Quantum-Resistant Constitutional Firewall) and the Separation Doctrine (Article 0.5).

### **6.3 Replay & BIV Verifiability Guarantees**

Every SemanticIntent object SHALL be sealed into the Replay-Verifiable Execution Plan record with:
- The original source NatSpec block (snippet)
- The full parsed and enriched object
- The TagBank version used
- The parser version (“NatSpecInterpreter-v2.3”)
- The resulting envelope triple for cross-verification

**BIV SHALL**:
- Re-parse the original source code against the sealed TagBank version
- Re-execute the full validation pipeline
- Assert exact structural and semantic match with the stored SemanticIntent object
- Verify that the resulting envelope triple matches the one recorded at classification time
- Flag any divergence as a constitutional violation

### **6.4 Failure & Enforcement Guarantees**

- Any fatal validation failure (missing required security block, unresolved tag, schema violation) SHALL force the envelope classifier to return **(P0, S0, E0)**.
- Warning-level issues SHALL be logged to BLVDB Anima but do not block execution.
- Repeated validation failures on the same lineage SHALL trigger an automatic lineage review.

### **6.5 Constitutional Closing for NatSpec++ v2**

NatSpec++ v2 is the **bridge between human intention and machine-enforced constitutional reality**. It ensures that every execution plan carries explicit, verifiable intent that can be audited, replayed, and non-regressed.  

By grounding all semantic metadata in the canonical TagBank and enforcing strict validation, NatSpec++ v2 upholds the non-regression, drift-resistance, and quantum-resistance guarantees that define ISA Fabric v6.0.

**No valid semantic intent → no execution.**  
**Invalid semantic intent → safest envelope (P0/S0/E0).**  
**Valid semantic intent + valid envelope → constitutional execution.**

---

## **Section 7 — Operator & Developer Responsibilities and TagBank Resolution (Expanded & Canonical)**

NatSpec++ v2 is the **bridge between human intention and machine-enforced constitutional reality**. Developers and operators share strict responsibilities to ensure semantic intent is accurate, complete, and fully grounded in the canonical TagBank.

### **7.1 Developer Responsibilities**

- Write clear, complete NatSpec++ v2 blocks for every public/external function and every governance action.
- Include at minimum a valid `@intent.security` block for any function that mutates state or affects governance.
- Use only tags that exist in the current TagBank version.
- Ensure all complex objects (especially security) conform to the referenced JSON schema.
- Treat NatSpec++ v2 as **executable code** — not decorative documentation.

**Consequence of neglect:** Missing or invalid blocks force the envelope classifier to return the safest envelope **(P0, S0, E0)**, which may block or severely constrain execution.

### **7.2 Operator Responsibilities**

- Verify that parsed SemanticIntent objects are correctly sealed into Replay-Verifiable Execution Plans.
- Review validation warnings and fatal errors logged to BLVDB Anima.
- Treat the parsed semantic intent as the **constitutional declaration of intent** that directly influences the Execution Envelope.
- Escalate repeated validation failures on the same lineage for review under Article XIV.5.

### **7.3 Deep Explanation of TagBank Resolution**

**TagBank is the single source of truth** for all semantic metadata in ISA Fabric v6.0. Resolution is the process by which the NatSpecInterpreter converts raw comment text into a validated, enforceable SemanticIntent object.

**Resolution Process (Step-by-Step):**

1. **Extraction**  
   The parser scans the NatSpec comment and extracts every `@intent.*` category and its key-value pairs.

2. **Tag Lookup**  
   For every tag key encountered (e.g., "parallel", "reentrancy", "critical"), the interpreter performs a lookup in the active TagBank version.  
   - If the key does not exist → **Fatal resolution failure**.  
   - If the key exists → proceed to type and rule validation.

3. **Type & Rule Validation**  
   The value is checked against the TagBank definition:
   - Simple types (boolean, number, string) are validated directly.
   - Complex objects (e.g., security) are validated against the referenced JSON schema (`natspec-security.schema.json`).
   - Custom validationRule (if present) is executed.

4. **Doctrinal Enrichment**  
   The resolved tag is enriched with metadata from TagBank:
   - `envelopeImpact` (how it affects P, S, or E axes)
   - `requiredFor` context (e.g., must be present for state-mutating functions)
   - Any default values or doctrinal mappings

5. **Failure Handling & Downgrade**  
   - Any fatal failure (unresolved tag, type mismatch, schema violation, missing required security block) causes the entire SemanticIntent to be marked invalid.
   - The envelope classifier is immediately instructed to return the safest envelope: **(P0, S0, E0)**.
   - A detailed error record (including original source snippet and failing tag) is sealed into BLVDB Anima.

6. **Success & Sealing**  
   On full success, the enriched SemanticIntent object is emitted and sealed together with the envelope triple, TagBank version, and parser version into the Replay-Verifiable Execution Plan record.

**Why TagBank Resolution is Constitutional**  
- It prevents semantic drift — only approved, versioned tags may influence execution.
- It enforces non-regression — BIV can always re-resolve against the exact TagBank version used at classification time.
- It upholds the Separation Doctrine — semantic intent is strictly interpreted and never granted normative authority beyond what the envelope allows.
- It provides auditability — every resolution step is logged and replayable.

**Operator Note:**  
If TagBank resolution fails repeatedly on a lineage, it is a strong indicator of either code rot or attempted drift. Immediate investigation and potential lineage review are required.

---

## **Section 8 — Operator & Developer Responsibilities (Strengthened)**

Developers and operators share a sacred responsibility to maintain the integrity of semantic intent within ISA Fabric v6.0.

### **Developer Responsibilities**
- Write clear, complete, and accurate NatSpec++ v2 blocks for every public/external function and every governance action.
- Ensure every state-mutating or governance-sensitive function includes a valid `@intent.security` block.
- Use only tags defined in the current canonical TagBank version.
- Treat NatSpec++ v2 as **executable constitutional metadata**, not decorative documentation.

**Failure to do so** results in automatic downgrade to the safest envelope (P0/S0/E0), potentially blocking or severely constraining execution.

### **Operator Responsibilities**
- Verify that parsed SemanticIntent objects are correctly sealed into Replay-Verifiable Execution Plans.
- Review and act upon validation warnings and fatal errors logged to BLVDB Anima.
- Treat the parsed semantic intent as the **constitutional declaration of intent** that directly shapes the Execution Envelope.
- Escalate repeated validation failures on any lineage for immediate review under Article XIV.5.

### **Core Constitutional Principle**
**No valid semantic intent → no execution.**  
**Invalid semantic intent → safest envelope (P0/S0/E0).**  
**Valid semantic intent + valid envelope → constitutional execution.**

NatSpec++ v2, grounded in the canonical TagBank and strictly validated, is the bridge between human intention and the machine-enforced constitutional reality of ISA Fabric v6.0.

---
**End of NatSpec++ v2 Semantic Intent Schema v2.4**  
*Sealed under ISA Fabric Genesis Governance v6.0 — April 2026*

**SHA-256:** *6d9174fdcd99e1fce9d231e84f92564fe365adebacf69ccd24ec9cc11d3764b0*