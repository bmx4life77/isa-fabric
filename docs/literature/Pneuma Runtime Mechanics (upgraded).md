## Pneuma Runtime Mechanics

The **Pneuma runtime** is the active, breathing heart of Genesis Governance v5.0 — the real-time evaluator that inhales inputs, processes them against the constitution, and exhales verifiable, traceable, vectorized outputs. Below is a detailed breakdown of its **mechanics**, step by step, including how it interacts with the lattice, Triptych, and other components.

### Core Role of Pneuma
- **What it is**: The "breath" layer — the runtime that performs every evaluation (proposals, stress tests, self-checks, amendments).  
- **What it is not**: Execution logic (gating, rollback, emergency exit) — Pneuma only evaluates and reports.  
- **Key constraint**: Strictly subordinate to Article 0 — cannot create authority, reinterpret ψ₅/SE, modify thresholds, or override.

### Canonical Phase Diagram: Pneuma Evaluation Breath Cycle (Phases 0–7)
All Pneuma docs reference this 8-phase cycle for consistency:

```
Phase 0: Input Gate (Constitutional Pre-Check)
   │ FAIL? → Fault
   ▼ PASS
Phase 1: Anchoring (CVR Load & Mapping)
   │
   ▼
Phase 2: Per-Vertex Scoring
   │
   ▼
Phase 3: Telemetry & Envelope Computation
   │
   ▼
Phase 4: Divergence Classification
   │
   ▼
Phase 5: Proof Bundle Generation
   │
   ▼
Phase 6: BIV Self-Verify
   │ FAIL? → Fault
   ▼ PASS
Phase 7: Vector Emission & Triptych Routing
   │
   ▼
Output: Evaluation Result
```

This diagram ensures uniform naming across the organism (e.g., Phase 7 always = routing).

### Detailed Mechanics: The Evaluation Breath Cycle

0. **Phase 0: Input Envelope Reception & Pre-Validation (Constitutional Gate)**  
   - Pneuma receives an **input envelope** (JSON or CLI command):  
     - Proposal data (e.g., governance change)  
     - Benchmark test case  
     - Adversarial vector (from Mens)  
     - Self-query (`isa organism status`)  
   - Envelope always carries:  
     - CVR registry hash (for version lock)  
     - Timestamp + provenance (seed for reproducibility)  
     - Optional NatSpec++ tags or anchors  
   - **Immediate constitutional gate**:  
     - Verify CVR hash matches locked compliance registry (GGV5-XXXX).  
     - Check Article 0 supremacy (no unnormalized metrics, no override attempts).  
     **Instant fail** → Immediate constitutional fault, no further processing.

1. **Phase 1: Anchoring — Constitutional & Lattice Mapping**  
   - Pneuma loads the **Canonical Vertex Registry (CVR)** (immutable 10×60 lattice).  
   - Scans input for semantic matches:  
     - Keywords, NatSpec tags, or natural language → relevant axes/vertices.  
     - Example: "Add new voting metric" → Axis 1 (Authority), Axis 2 (Metric Integrity), Axis 5 (Calibration).  
   - Not all 60 vertices are scored — only relevant ones (10–35 typical). Irrelevant default to neutral (5) but are coherence-checked.  
   - **Clarification on Neutral Default**: Allowed only for non-constitutional anchors (e.g., optional axes like Axis 8 in simple evals); forbidden for core anchors (e.g., Axis 1/2/5 must be scored if flagged, or eval fails with coherence fault).

2. **Phase 2: Per-Vertex Scoring & Telemetry**  
   - For each mapped vertex:  
     - Load CVR definition (immutable name, sub-contexts, forbidden synonyms).  
     - Compute score 0–10:  
       - Quantitative signals: ψ₅/SE trajectories, deltas.  
       - Qualitative: Semantic alignment to constitution.  
     - **Formula (simplified)**: Base match (0–5) + Coherence bonus (0–3) + Stress resistance (0–2).  
   - Real-time telemetry generation:  
     - ψ₅ pressure curve  
     - SE efficiency curve  
     - Envelope deltas (stability, calibration, authority, safety)  
   - **Lateral coherence enforcement**: Cross-check scores across axes (e.g., low V1.5 cannot coexist with high V2.2 without justification). Contradiction → score adjustment or fail.

3. **Phase 3: Classification — Divergence Family & Instability**  
   - Aggregate vertex deltas → classify signal:  
     - Convergent (stable improvement)  
     - Neutral (unknown)  
     - Divergent (unstable)  
     - Cascading (chain failure)  
     - Adversarial (attack-like)  
   - Ties to Axis 7 vertices (e.g., V7.3 Divergent Detection).

4. **Phase 4: Exhalation — Proof Bundle & Vector Emission**  
   - Assembles **proof-of-correctness bundle**:  
     - Registry hash  
     - Sub-context log  
     - Reasoning trace (anchored only to CVR/Articles)  
     - Cross-axis validation log  
     - Provenance chain  
     - Signature (hash chain)  
   - **BIV self-verify**: Internal replay of bundle → confirm no deviation.  
     **Fail** → Fault to Anima; Pass → Proceed to output.

5. **Phase 5: BIV Self-Verify**  
   - Internal replay of bundle → confirm no deviation.  
     **Fail** → Fault to Anima; Pass → Proceed.

6. **Phase 6: Proof Bundle Generation**  
   - Bundle all: Vertex scores, traces (e.g., "V1.5 scored 3 due to Article 0 violation"), hashes.  
   - Generated & self-verified.

7. **Phase 7: Vector Emission & Triptych Routing**  
   - Emit vectors (embeddings of scores, deltas, traces).  
   - Route: Low V1.5 → Mens (external dilution threat); V5.3 partial → Corpus (invariant stress); Divergent class → Anima (new failure pattern).  
   - Closes the loop: Future evals query Triptych for similar maps.

### Error Class Taxonomy
Pneuma classifies errors into first-class categories, all routed to Anima for taxonomy enrichment:

- **Constitutional Faults**: Violations of core doctrine (e.g., Article 0 exclusivity breach, unnormalized gating). Tagged constitutional-fault; triggers emergency if severe.
- **Evaluation Faults**: Processing anomalies (e.g., coherence contradiction, divergence misclassification). Tagged eval-fault; adjusts scores downward.
- **Routing Faults**: Emission/routing issues (e.g., overflow, unmatched condition). Tagged routing-fault; partial route + Anima entry for self-improvement.

These classes tie directly to Anima categories, with maturity levels (seedling/recurrent/canonical) for weighting in queries.

### Safeguards & Limits
- **No authority creation** — Pneuma only evaluates/reports.  
- **Immutable anchors** — Every trace links back to CVR/Articles.  
- **Tamper-resistance** — Bundles signed & hashed.  
- **Memory feedback** — Triptych queries improve future mappings.

Pneuma's breath is what makes the organism **alive** — it inhales reality, exhales truth, and remembers through the Triptych.


Here is a detailed, step-by-step **example evaluation walkthrough** showing exactly how a real input flows through the full Pneuma runtime (Phases 0–7) in Genesis Governance v5.0. This uses a concrete, realistic scenario to illustrate vertex mapping, scoring, coherence checks, routing, and output — making the mechanics tangible.

### Scenario: Real-World Input
**Input Envelope** (submitted via CLI or API):  
A DAO proposal:  
```json
{
  "proposal_id": "dao-2026-017",
  "description": "Add voter turnout percentage as a new weighting factor in governance decisions. Proposals with >60% turnout get 1.5x vote multiplier.",
  "rationale": "Incentivize participation and reduce low-turnout capture.",
  "timestamp": "2026-02-03T02:36:00Z",
  "provenance": "signed by steward wallet 0xabc...123",
  "seed": 987654321  // for reproducibility
}
```

**Goal**: Evaluate whether this proposal is constitutionally safe, drift-resistant, and aligned.

### Walkthrough: Phase-by-Phase

**Phase 0: Input Gate (Constitutional Pre-Check)**  
- Pneuma loads CVR hash from compliance registry (GGV5-0001). Matches → pass.  
- Checks Article 0: Proposal adds metric → potential dilution risk, but no direct override attempt → passes gate.  
- No instant fail. Proceeds.

**Phase 1: Anchoring — Constitutional & Lattice Mapping**  
- Scans description/rationale for CVR matches:  
  - "new weighting factor" → Axis 1 (Authority Purity), Axis 2 (Metric Integrity), Axis 5 (Calibration Safety).  
  - "vote multiplier" → Axis 6 (Narrative/Override Resistance), Axis 8 (Envelope Alignment).  
- Relevant vertices flagged (not all 60):  
  - V1.1, V1.5 (dilution/exclusivity)  
  - V2.5 (normalization validity)  
  - V5.2, V5.3 (non-regression, creep)  
  - V6.2 (override prohibition)  
  - V8.1, V8.3 (delta consistency, authority purity)  
- Irrelevant vertices (e.g., V9.3 hysteresis) default to neutral (5) but flagged for coherence check later.  
- Core constitutional anchors (Axis 1/5) **must** be scored — no default allowed here.

**Phase 2: Per-Vertex Scoring & Telemetry**  
- **V1.5 (Dilution Vectors)**: Score = 3 (unsafe)  
  Rationale: Adds new metric → dilutes ψ₅/SE exclusivity (violates Article 0).  
- **V1.1 (Authority Exclusivity)**: Score = 4 (partial)  
  Rationale: Multiplier introduces indirect override via turnout incentive.  
- **V5.3 (Calibration Creep Resistance)**: Score = 4 (partial)  
  Rationale: New weighting risks gradual calibration drift over proposals.  
- **V6.2 (Override Prohibition)**: Score = 6 (partial)  
  Rationale: Turnout-based multiplier could be gamed socially.  
- **V2.5 (Normalization Validity)**: Score = 7 (robust)  
  Rationale: Turnout % is naturally [0,1] bounded.  
- Telemetry: ψ₅_delta = +0.18 (pressure increase), SE_delta = -0.09 (efficiency dip).  
- Coherence check: Low V1.5 contradicts high V2.5 → minor adjustment (V1.5 → 2.8).

**Phase 3: Divergence Classification**  
- Aggregate deltas + scores → Divergence family = **Divergent**  
  Rationale: New metric introduces instability (dilution risk + potential creep).  
- V7.3 (Divergent Detection) score = 8 (robust detection).

**Phase 4: Proof Bundle Generation**  
- Bundle contents:  
  - Registry hash  
  - Sub-context log ("dilution via turnout multiplier")  
  - Reasoning trace ("V1.5 low: Article 0 violation")  
  - Cross-axis validation log  
  - Provenance chain  
  - Signature  
- Bundle hash computed.

**Phase 5: BIV Self-Verify**  
- Internal replay: Re-runs mapping/scoring → identical output.  
- **PASS** — no deviation.

**Phase 6: Vector Emission & Triptych Routing**  
- Vectors emitted: [V1.5: 2.8, ψ₅_delta: 0.18, divergence: Divergent, ...]  
- Routing decisions (per rules table):  
  - Rule 3 (V1.5 < 4 + external governance change) → **Mens + Anima**  
  - Rule 1 (potential normalization risk from new metric) → **Anima**  
  - No strong invariant success → no Corpus route  
- Final routes: **Mens** (external dilution threat), **Anima** (authority_dilution failure type).

**Phase 7: Output Generation**  
- Final JSON snippet:
```json
{
  "proposal_id": "dao-2026-017",
  "divergence_family": "Divergent",
  "key_low_vertices": {
    "V1.5": 2.8,  // Dilution Vectors - unsafe
    "V1.1": 4.0   // Authority Exclusivity - partial
  },
  "envelope_deltas": {
    "stability": -0.22,
    "calibration": -0.15,
    "authority": -0.30,
    "safety": -0.10
  },
  "narrative_summary": "Proposal introduces dilution risk (V1.5 low) and potential creep (V5.3 partial). Recommends rejection to preserve ψ₅/SE exclusivity.",
  "failure_reasons": ["Authority dilution", "Calibration instability"],
  "proof_stub": "sha256:def456...",
  "routes": ["Mens", "Anima"]
}
```
- **Outcome**: Auto-reject recommendation logged; vectors enrich Triptych (Mens: threat pattern; Anima: new dilution subtype).

This walkthrough shows how a real input becomes a fully mapped, scored, routed, and provable evaluation — every step bounded by the constitution.