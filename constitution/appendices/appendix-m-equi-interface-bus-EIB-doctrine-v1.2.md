# **Appendix M — Equi Interface Bus (EIB)**  
**Version:** v1.0  
**Status:** Draft for Ratification  
**Constitutional Basis:** Articles XXIII, XXVIII, XXXIV, XXXV, XXXVI, XVIII, XIV.5, and the CUAP/BEP pipeline.

---

## **Purpose**  
This Appendix defines the **Equi Interface Bus (EIB)** — the universal, omni‑layer, non‑normative, non‑interpretive transport substrate that carries all lawful signals, vectors, events, semantic payloads, invariant notices, breach events, JHI proposals, revocation requests, and constitutional updates between the organs of the ISA Fabric.

EIB is the **connective tissue** of the organism.  
It ensures equilibrium, equivalence, and equalization across:

- ontological layers (Pillars, Σ(t), invariants)  
- operational layers (ψ, Θ, envelopes, Sub‑Class D)  
- semantic layers (NatSpec++)  
- evaluative layers (Pneuma, Ξ)  
- corrective layers (Revocation Engine)  
- temporal layers (Σ(t) → Σ(t+1))  

EIB SHALL be recognized as a first‑class constitutional organ.

---

## **M.1 Core Invariants**

**M.1.1**  
EIB SHALL be the sole lawful transport substrate for all inter‑organ communication within ISA Fabric.

**M.1.2**  
No subsystem MAY bypass EIB, create a parallel bus, or introduce alternative transport channels.

**M.1.3**  
EIB SHALL be non‑interpretive, non‑normative, and non‑authoritative.  
It SHALL carry signals but SHALL NOT modify, prioritize, reinterpret, or filter them.

**M.1.4**  
All EIB messages SHALL be replay‑verifiable, deterministic, and cryptographically sealed.

**M.1.5**  
EIB SHALL preserve equilibrium: no message MAY alter ψ₅, SE, or any metric authority.

---

## **M.2 Message Classes (Canonical)**  
EIB SHALL support the following canonical message classes:

1. **Evaluative Vectors** (from Pneuma)  
2. **Breach Events** (from Ξ)  
3. **Invariant Notices** (from Invariarchs)  
4. **JHI Proposals** (from runtime traces + NatSpec++)  
5. **Revocation Requests** (from Invariarchs + Ξ)  
6. **Revocation Actions** (from Revocation Engine)  
7. **Semantic Payloads** (NatSpec++ annotations)  
8. **Envelope Deltas**  
9. **Divergence Classes**  
10. **Transition Vectors** (for Σ(t+1) adoption)  
11. **BIV Verification Results**  
12. **BEP Sealing Instructions**

Each message SHALL include:

- canonical type  
- timestamp  
- causal vector  
- jurisdiction  
- payload hash  
- lineage identifiers  
- Σ(t) anchor  

---

## **M.3 Transport Guarantees**

**M.3.1 Determinism**  
Given identical event sequences, EIB SHALL deliver identical message sequences.

**M.3.2 Ordering**  
EIB SHALL preserve canonical ordering:  
\[
(timestamp, causal\_vector, node\_id, message\_hash)
\]

**M.3.3 No Mutation**  
EIB SHALL NOT mutate message payloads.

**M.3.4 No Promotion**  
EIB SHALL NOT promote interpretive signals to normative authority.

**M.3.5 No Filtering**  
EIB SHALL NOT drop, reorder, or suppress lawful messages.

---

## **M.4 Interaction With Constitutional Organs**

### **M.4.1 Pneuma (Class E)**  
Pneuma SHALL emit evaluative vectors into EIB.  
Pneuma SHALL NOT read or modify messages in transit.

### **M.4.2 Invariarch Family**  
Invariarchs SHALL receive NatSpec++ payloads, breach events, and JHI proposals via EIB.  
Invariarchs SHALL emit invariant notices and revocation classifications via EIB.

### **M.4.3 Ξ‑Layer**  
Ξ SHALL emit breach events into EIB.  
Ξ SHALL NOT perform enforcement or correction.

### **M.4.4 Revocation Engine**  
Revocation Engine SHALL receive revocation requests via EIB.  
Revocation Engine SHALL emit corrective actions and Σ(t+1) adoption vectors via EIB.

### **M.4.5 BIV**  
BIV SHALL receive all messages required for boundedness, invariance, and verification.  
BIV SHALL emit verification results into EIB.

### **M.4.6 BEP**  
BEP SHALL receive sealing instructions via EIB.  
BEP SHALL emit canonical hashes and ratification results into EIB.

---

## **M.5 Sealing and Compliance**

**M.5.1**  
EIB SHALL be sealed under CUAP and ratified under BEP.

**M.5.2**  
Any modification to EIB message classes, ordering rules, or transport semantics SHALL require full constitutional amendment.

**M.5.3**  
Any subsystem bypassing EIB SHALL trigger conservative mode (P0/S0/E0) and lineage review.

**M.5.4**  
EIB SHALL include canonical test vectors verifying:

- ordering  
- determinism  
- replayability  
- message integrity  
- cross‑organ routing  

---

## **M.6 Constitutional Status**

EIB SHALL be recognized as a **first‑class constitutional organ**.  
It SHALL serve as the universal connective substrate for all lawful transitions, evaluations, corrections, and lineage updates.

No subsystem MAY operate outside EIB.