**Appendix I – Failure Mode Taxonomy**  
**Version:** v1.0  
**Status:** Canonical, Sealed under CUAP and BEP  
**Cross-references:** Article VIII (Pneuma), Article XIX (Pneuma Integrity), Article XXXIV (UCD), Appendix P (Invariarch)

**I.1 Purpose**  
This appendix provides the canonical classification of all failure modes to enable consistent detection, reporting, and response by Pneuma and BIV.

**I.2 Failure Mode Classes**

- **Class 1: Metric Drift** — Deviation from ψ₅ or SE bounds  
- **Class 2: Invariant Violation** — Breach of α < β, embedding immutability, etc.  
- **Class 3: Replay Non-Determinism** — Non-reproducible transitions  
- **Class 4: Authority Leakage** — Interpretive signal promoting to normative  
- **Class 5: Memory Corruption** — Unauthorized Preisach or embedding mutation  
- **Class 6: Density / Coherence Failure** — Fragmentation or overload  
- **Class 7: Lineage Break** — Broken causal stratification or revocation violation  

**I.3 Detection and Response**  
Each class SHALL map to specific Pneuma evaluation rules, envelope downgrades, and BIV verification steps. All failures SHALL be logged to BLVDB Anima with full provenance.

**I.4 Sealing Clause**  
This taxonomy is immutable except through full BEP ratification. New failure modes MUST be elevated through BEP and added to this sealed list.