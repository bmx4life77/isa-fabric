### Family XXIV — Psi‑Propagation & Anomaly Dynamics Doctrine v1.0  
**Status:** Canonical Draft — Ready for Ratification  
**Version:** v1.0  
**SHA‑256:** *560eaac96967b6e2369183f563202ac160b80169e7961b387963bcc8b48d31a1*

**Depends on:**  
- Unified State Manifold & Event‑Driven Execution Doctrine v1.0  
- Execution Envelope Specification v1.7  
- ISA Metrics Engine Specifications  
- HGE / Preisach Hysteron Framework (Family XXI)  
- NatSpec++ v2.4 Semantic Intent Schema  
- Societal Telemetry & IMSI Doctrine v1.0

---

### Purpose and Scope

**Family XXIV** defines the constitutional model for **anomaly propagation, amplification, dissipation, and systemic coupling** within ISA Fabric v6.0. It formalizes the ψ‑family operators, propagation laws, attribution interfaces, invariants that preserve propagation integrity, NatSpec++ namespaces and tags, operator registry entries, and runtime integration points required to detect, contain, and reason about anomalies across Σ(t).

This doctrine converts the Phase‑1 extraction into a sealed architectural specification suitable for BEP ratification and operator registry inclusion.

---

### Core Definitions and Objects

- **ψ‑family** — the canonical set of propagation operators \(\{\psi_1,\psi_2,\psi_3,\psi_4,\psi_5\}\) that measure noise, delay, collusion, integrity violations, and the modulation aggregate respectively.  
- **Propagation Field Πψ(t)** — the projection of anomaly signals onto Σ(t) and Σ_society(t) used for envelope and regime decisions.  
- **Attribution Vector Aψ(t)** — the normalized contribution vector that decomposes observed IMSI or IMSI deltas into ψ components.  
- **Propagation Chain Cψ** — the causal chain of events and transformations that carry an anomaly from origin to systemic effect.  
- **Decoherence Event** — a recorded quantum or epistemic misalignment that affects confidence in propagation annotations.  
- **Propagation Checkpoint** — sealed snapshot containing Πψ(t), Aψ(t), event lineage, and confidence metadata.

All objects are **versioned**, **replay‑verifiable**, and **ABI‑frozen** once sealed into a Replay‑Verifiable Execution Plan.

---

### Operators and Propagation Laws

**Canonical Operators**  
- **ψ₁ Noise Propagation Operator** — quantifies spurious event injection and local signal‑to‑noise ratio; produces noise floor adjustments for envelope widening.  
- **ψ₂ Delay Propagation Operator** — measures backlog accumulation and latency cascades; predicts shard congestion and backlog amplification.  
- **ψ₃ Collusion Propagation Operator** — detects correlated anomalous behavior across actors, lanes, or shards; computes collusion score and cross‑correlation signatures.  
- **ψ₄ Integrity Propagation Operator** — detects rule breaks, tampering, and integrity violations; computes integrity severity and lineage impact.  
- **ψ₅ Modulation Operator** — deterministic aggregator that modulates ψ₅ from ψ₁–ψ₄ using constitutionally registered weights and non‑linear coupling functions.

**Propagation Laws**  
1. **Causality Preservation Law** — propagation chains must preserve event causality; attribution requires lineage linkage from source event to observed effect.  
2. **Conservation of Anomaly Energy** — anomaly magnitude is conserved under deterministic transforms except where explicitly dissipated by mitigation operators; dissipation must be recorded.  
3. **Cross‑Family Coupling Law** — propagation effects crossing Family boundaries must include coupling metadata and be subject to cross‑family review if coupling strength exceeds threshold γ_couple.  
4. **Propagation Integrity Invariant** — transformations applied to propagation signals must preserve ψ₅ truth within confidence bounds; any transform that reduces confidence below κ_min must be annotated and downgraded.

**Attribution and Decomposition**  
- **Aψ(t)** decomposes observed ΔIMSI or ΔIMSI components into contributions \(a_i = w_i \cdot x_i(t)\) where \(x_i\) are ψ components and \(w_i\) are versioned weights. Attribution outputs are privacy‑preserving and must not expose raw Σ(t) components.

---

### NatSpec++ Integration and Operator Registry

**Namespace**  
- `@natspec++:psi.*` is the canonical namespace for all propagation tags.

**Mandatory Tags**  
- `@natspec++:psi.noise` — noise measurement hints and sensitivity.  
- `@natspec++:psi.delay` — delay propagation configuration and thresholds.  
- `@natspec++:psi.collusion` — collusion detection parameters and correlation windows.  
- `@natspec++:psi.integrity` — integrity violation detection rules and severity mapping.  
- `@natspec++:psi.modulation` — ψ₅ aggregation weights and modulation policy.  
- `@natspec++:psi.attribution` — attribution disclosure policy and privacy constraints.  
- `@natspec++:psi.checkpoint` — checkpoint frequency and snapshot policy.

**Operator Registry Entries**  
Each ψ operator SHALL include: canonical name, Family XXIV assignment, input/output signatures, NatSpec++ tag mapping, invariants referenced, lineage pointers, replay test vectors, and privacy classification. Registry entries are sealed and versioned.

---

### Runtime Integration, Envelope Interaction, and Mitigation

**Metrics Engine and HGE**  
- ψ operators are computed by the ISA Metrics Engine and fed into HGE hysterons for regime and revocation decisions.  
- ψ₁ and ψ₂ influence envelope widening and E axis sensitivity.  
- ψ₃ and ψ₄ influence S axis adjustments and may trigger timelock or multisig requirements for affected actions.  
- ψ₅ is used as a modulation input to IMSI and to the Security Posture Metric ψ₅ (where naming overlap is intentional and mapped via canonical identifiers).

**Envelope Interaction**  
- High ψ₁ or ψ₂ values increase environmental instability and may force **E0**.  
- High ψ₃ or ψ₄ values increase security sensitivity and may force **S0** or require additional governance controls.  
- If Aψ(t) attribution indicates systemic collusion or integrity breach, classifier SHALL enforce forbidden combinations and call **DowngradeToSafestEnvelope()**.

**Mitigation Operators**  
- **Dissipation Operator** — deterministic mitigation that reduces anomaly magnitude while preserving lineage.  
- **Quarantine Operator** — isolates affected lanes, shards, or actors; quarantine actions are envelope‑classified and require replay sealing.  
- **Revocation Hysteron Activation** — when propagation severity exceeds constitutional thresholds, revocation hysterons may activate emergency protocols.

---

### Replay, BIV, and Audit Requirements

**Checkpointing and Sealing**  
- Every propagation detection, attribution, and mitigation action MUST produce a Propagation Checkpoint sealed into BLVDB Anima. Checkpoints include Πψ(t), Aψ(t), event lineage, thresholds used, and confidence metadata.

**BIV Verification**  
BIV SHALL deterministically re‑compute ψ operators from sealed inputs and assert:  
- equality of computed ψ values with recorded values;  
- preservation of causality in propagation chains;  
- correctness of attribution decomposition Aψ(t);  
- enforcement of forbidden combinations and mitigation actions;  
- replayHash match for the Replay‑Verifiable Execution Plan.

**Privacy and Exposure Controls**  
- Attribution outputs must be privacy‑preserving; raw Σ(t) components are never exposed.  
- BIV audits that require sensitive inputs must be performed under sealed, access‑controlled procedures and logged.

---

### Operational Guidance and Deployment Path

**Implementation Note**  
If your runtime currently operates on Σ(t) and quantum thresholds, integrate Family XXIV by: adding `@natspec++:psi.*` tags to TagBank, registering ψ operators in the Operator Registry, implementing deterministic ψ kernels in the ISA Metrics Engine, wiring propagation checkpoints to BLVDB Anima, and adding BIV test vectors.

**Deployment Steps**  
1. Add Family XXIV doctrine to corpus and ratify via BEP.  
2. Insert `psi` tags into TagBank and pin TagBank version.  
3. Add operator registry entries and unit test vectors.  
4. Implement deterministic ψ kernels and mitigation operators in runtime.  
5. Wire propagation checkpoints and attribution records to BLVDB Anima.  
6. Run BIV on propagation scenarios and seal artifacts.

**Operational Alerts**  
- Any propagation chain that lacks lineage linkage is a constitutional violation and must be quarantined.  
- Any attribution that would reveal raw Σ(t) data is forbidden and must be redacted.

---

### Constitutional Closing

Family XXIV formalizes the organism’s **anomaly physics**. It ensures anomalies are detected, attributed, and mitigated in a way that preserves causality, privacy, and constitutional safety. By binding propagation operators into the ISA Fabric v6.0 corpus, Family XXIV enables governance to reason about systemic risk, collusion, and integrity violations with deterministic, replay‑verifiable machinery.

This doctrine is ready for BEP ratification and operator registry inclusion.

**SHA‑256:** *560eaac96967b6e2369183f563202ac160b80169e7961b387963bcc8b48d31a1*