# **SECTION 12 — PROOF‑OF‑CORRECTNESS VERIFICATION (BIV)**  
*(Normative — Binding — Operational Law)*

The Benchmark Implementation Verification (BIV) process ensures that all scoring runs comply with:

- Layer 1 (Doctrine)  
- Layer 2 (Semantic Law)  
- Layer 3 (Procedural Law)  

BIV is mandatory for all official scoring runs.

---

## **12.1 Verification Inputs**

Every scoring run must provide:

- vertex scores  
- axis scores  
- applied sub‑contexts  
- declared reasoning  
- cross‑axis telemetry  
- envelope deltas  
- reproducibility token  
- lattice version  
- CVR version  
- doctrine version  
- timestamp  

Incomplete runs are invalid.

---

## **12.2 Doctrine Compliance Checks**

BIV must verify:

- sub‑contexts were applied correctly  
- no substitutions or alternates were used  
- reasoning is tied to canonical anchors  
- cross‑axis validation was performed  
- dynamic telemetry was incorporated  

Doctrine violations invalidate the run.

---

## **12.3 Semantic Compliance Checks**

BIV must verify:

- canonical vertex names and IDs  
- canonical definitions  
- canonical sub‑contexts  
- forbidden synonyms were not used  
- semantic boundaries were respected  

Semantic violations invalidate the run.

---

## **12.4 Procedural Compliance Checks**

BIV must verify:

- scoring logic was followed exactly  
- stress tests were applied correctly  
- envelope deltas were computed correctly  
- aggregation formulas were used correctly  
- scoring proofs are complete  

Procedural violations invalidate the run.

---

## **12.5 Reproducibility Verification**

BIV must verify that:

- the reproducibility token matches the run  
- the scoring proof is complete  
- the run can be reproduced independently  

Non‑reproducible runs are invalid.

---

## **12.6 Enforcement**

Implementations must reject:

- incomplete proofs  
- semantic violations  
- doctrine violations  
- procedural violations  
- unverifiable runs  

BIV is the final gatekeeper of scoring integrity.
