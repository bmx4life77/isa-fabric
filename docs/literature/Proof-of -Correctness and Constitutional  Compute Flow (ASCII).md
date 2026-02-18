## 5A — Proof-of-Correctness Doctrine Clause  
*(Normative — Binding — Operative — v1.0)*

This clause establishes the supreme law governing all compute operations within the Governance Benchmarking Lattice.  
No computation — whether performed by evaluator, simulator, CLI, AI agent, or human — may claim validity unless it proves fidelity to canonical semantics.

### 1. Supremacy of Canonical Semantics

All meaning derives exclusively from the Canonical Vertex Registry (axes, vertices, sub-contexts, scoring anchors).  
Compute possesses no authority to:

- reinterpret vertex definitions  
- substitute alternate sub-contexts  
- invent synonyms, antonyms, or domain-specific meanings  
- randomize or probabilistically weight scores  
- introduce emergent logic or evaluator discretion  

Any such act constitutes a **constitutional fault** and renders the run void ab initio.

### 2. Mandatory Proof-of-Correctness

Every compute run MUST produce and preserve a verifiable **proof bundle** containing:

- **Registry Hash** — SHA-256 of the exact Canonical Vertex Registry version used  
- **Sub-Context Declaration Log** — exhaustive list of all applied sub-contexts (canonical only)  
- **Reasoning Trace** — step-by-step justification tied exclusively to scoring anchors and sub-contexts  
- **Cross-Axis Validation Log** — proof of consistency checks across axes (e.g., low authority purity implying high interpretive risk)  
- **Provenance** — input envelope hash, evaluator commit hash, timestamp, seed (if applicable), output envelope hash  
- **Signature** — cryptographic or deterministic hash chain binding all above elements  

The absence of any element invalidates the run.

### 3. Reproducibility & Auditability

Another evaluator, given the same input envelope and same registry version, MUST:

- apply identical sub-contexts  
- follow identical reasoning  
- produce identical scores  
- generate identical proof bundle  

Failure to reproduce constitutes non-compliance.

### 4. Dynamic Telemetry Requirement

Scoring is not static judgment — it is **dynamic governance telemetry**.  
Every run MUST log:

- ψ₅/SE values during evaluation (where relevant)  
- cross-axis deltas and validation results  
- any detected inconsistencies (flagged as potential faults)

Telemetry MUST be preserved for audit and Research Lab analysis.

### 5. Enforcement & Constitutional Fault

All implementations (CLI, evaluator, simulator, Research Lab) MUST:

- reject runs lacking complete proof bundle  
- flag and log constitutional faults  
- halt execution on detected deviation  

BIV (Benchmark Implementation Verification) MUST re-verify proof bundles on demand.  
Any fault detected by BIV triggers immediate rollback to last verified state.

### 6. Supremacy Over All Compute

This doctrine is supreme over all applied compute in ISA Fabric.  
No evaluator, AI agent, or future extension may override, relax, or reinterpret these requirements.  
Any attempt to do so is void and constitutes a **constitutional crime** against the lattice.

Cross-reference:  
- Genesis Governance v4.0 Article 0 (Metric Authority Doctrine)  
- Canonical Vertex Registry (authoritative semantics)  
- BEP v1.0 (evolution without drift)  
- BIV (implementation verification)


Constitution (Genesis v4.0)
          │
          ▼
Canonical Vertex Registry
(axiomatic semantics + sub-contexts)
          │
          ▼
Scoring Doctrine Clause
(binds semantics → compute → proof)
          │
          ▼
Input Envelope ───────► Evaluator / Simulator / CLI
          │
          ▼
Compute Execution
  └─► Apply canonical sub-contexts only
  └─► Generate reasoning trace (anchors only)
  └─► Perform cross-axis validation
          │
          ▼
Proof Bundle Generation
  - Registry hash
  - Sub-context log
  - Reasoning trace
  - Cross-axis log
  - Provenance (hashes, timestamp)
  - Signature (hash chain)
          │
          ▼
BIV Verification
- Replay proof against constitution
- Confirm no deviation / leakage
          │ FAIL? ──────► CONSTITUTIONAL FAULT
          │             - REJECT run
          │             - Log violation
          │             - Rollback to prior state
          │             - Alert stewards
          │
          ▼ PASS
Resilience Report / Envelope
(with embedded proof signature)
