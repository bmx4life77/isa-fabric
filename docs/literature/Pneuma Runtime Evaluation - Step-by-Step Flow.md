### Pneuma Runtime Evaluation – Step-by-Step Flow

1. **Input Reception**  
   Pneuma receives an **input envelope**:  
   - Proposal JSON (e.g., governance/proposals/pending/...)  
   - Benchmark test case  
   - Adversarial vector from Mens  
   - Self-evaluation command (`isa organism status`)  
   Envelope always includes:  
   - Registry hash (CVR version)  
   - Timestamp & provenance  
   - Optional: seed for reproducibility

2. **Constitutional Anchor Check (Phase 0 – Instant Fail)**  
   Pneuma first verifies:  
   - Current CVR hash matches locked registry (from compliance entry GGV5-XXXX)  
   - Article 0 supremacy (ψ₅/SE exclusivity) is not violated in input  
   **FAIL** → Immediate constitutional fault, no further processing  
   **PASS** → Proceed

3. **Lattice Mapping & Per-Vertex Scoring**  
   Pneuma maps input to the 10×60 Governance Lattice:  
   - Each relevant vertex (e.g., V1.1 Authority Purity, V5.4 Calibration Lock) is scored 0–10  
   - Scoring uses canonical definitions from CVR  
   - Lateral coherence enforced: cross-axis checks (no contradictions, e.g., high authority purity cannot coexist with low metric independence)

4. **Dynamic Telemetry & Envelope Computation**  
   During scoring, Pneuma generates real-time telemetry:  
   - ψ₅ trajectory (security pressure)  
   - SE trajectory (efficiency)  
   - Envelope deltas: stability, calibration, authority, safety  
   - Divergence family classification (Convergent, Neutral, Divergent, Cascading, Adversarial)  

5. **Proof Bundle Generation**  
   Pneuma assembles the **proof-of-correctness bundle**:  
   - Registry hash  
   - Sub-context log  
   - Reasoning trace (anchored only to CVR vertices & Articles)  
   - Cross-axis validation log  
   - Provenance chain (input → output hashes)  
   - Signature (hash chain)  
   Bundle is cryptographically tamper-resistant

6. **BIV Verification (Self-Check)**  
   Pneuma runs internal BIV replay:  
   - Re-executes evaluation using bundle  
   - Confirms no deviation from canonical semantics  
   **FAIL** → Constitutional fault logged → rollback to prior state  
   **PASS** → Proceed to output

7. **Vector Emission & Triptych Routing**  
   Pneuma emits vectors (embeddings of scores, deltas, traces):  
   - **Mens**: if external threat/weakness pattern detected  
   - **Corpus**: if invariants upheld/enforced  
   - **Anima**: if failure mode triggered (metric failure, drift, override, etc.)  
   Routing is deterministic and logged

8. **Final Output**  
   Pneuma returns:  
   - Evaluation result JSON (scores, envelopes, divergence family)  
   - Trace array (step-by-step log)  
   - Proof stub (bundle hash)  
   - Narrative summary (human-readable explanation)  
   - Failure reasons (if any)  
   Example CLI: `isa governance evaluate proposal.json --verbose --narrative`

### Key Constitutional Limits of Pneuma
Pneuma **cannot**:
- Create or reinterpret authority  
- Override ψ₅/SE thresholds  
- Modify persistence windows or hysteresis  
- Exit emergencies or perform rollbacks  
- Alter the constitution or CVR

It is **evaluation-only** — execution logic (gating, rollback) lives outside Pneuma.

### Summary – What Pneuma Actually Does
Pneuma is the **real-time constitutional nervous system**:
- Breathes in input  
- Anchors to the lattice & constitution  
- Scores with lateral coherence  
- Emits traceable vectors & proofs  
- Routes memory to the Triptych  
- Breathes out verifiable, drift-resistant evaluation

Every breath makes the organism wiser — past evaluations feed future wisdom through BLVDB.

