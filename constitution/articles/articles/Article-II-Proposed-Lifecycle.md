# **Article II — Proposal Lifecycle (Final Regenerated Version)**  
### *With Canonical State, Hygiene Safeguards, and Non‑Authority Clauses Integrated*

---

## **II.0 Canonical State Prerequisite**

### **II.0.1 Impact Profiles as Canonical State**
Impact Profiles constitute the **canonical state representation** of every participant within Genesis Governance v4.0. They are the authoritative source of truth for contributor identity, capability, historical impact, and governance eligibility.

**Roles, permissions, thresholds, proposal rights, and emergency authorities are *derived views* over the Impact Profile — not independent objects.**  
This is a constitutional invariant.

### **II.0.2 State Integrity and Cache Prohibition**
Any cached or derived state used for performance must be **provably recomputable** from the canonical Impact Profile and must **never** be treated as authoritative.

No subsystem may maintain a parallel or shadow representation of participant state.

### **II.0.3 Governance Consequence**
All proposal lifecycle transitions — creation, validation, deliberation, voting, execution, and post‑execution review — must reference the Impact Profile as the authoritative participant state.

Proposal eligibility, quorum requirements, voting weight, and execution authority must be computed **directly** from canonical state.

### **II.0.4 Constitutional Rationale**
Elevating Impact Profiles to canonical state ensures:

- non‑collusive authority  
- unified participant state  
- adaptive governance  
- traceable decision‑making  
- closed‑loop coherence with ISA Metrics GCS  

This prerequisite forms the structural foundation for the Proposal Lifecycle.

---

## **II.1 Proposal Creation**
A proposal may be created by any participant whose Impact Profile satisfies the minimum eligibility criteria derived from canonical state, including:

- minimum impact tier  
- domain‑specific authority  
- historical reliability  
- absence of active sanctions  

Proposal metadata must include:

- intent  
- scope  
- affected domains  
- required thresholds  
- canonical state snapshot  

---

## **II.2 Proposal Validation**
Before entering deliberation, a proposal undergoes validation:

- structural correctness  
- canonical state alignment  
- threshold correctness  
- domain routing  
- conflict detection  

Validation must reference the proposer’s Impact Profile and all affected participants.

---

## **II.3 Deliberation Phase**
Proposals enter a deliberation window during which:

- participants review canonical state impacts  
- domain experts annotate risks  
- narrative and Θ‑layer explanations may be attached  

**Narrative and Θ‑layer explanations are strictly non‑authoritative and may not influence eligibility, voting power, or execution gating.**

Deliberation is informational only.

---

## **II.4 Voting Phase**
Voting rights and weights are derived from Impact Profiles:

- impact tier determines voting power  
- domain alignment determines relevance  
- historical reliability modulates influence  

Votes are recorded against canonical state snapshots to ensure traceability.

---

## **II.5 Execution Phase**
Upon successful vote:

- timelock scheduling  
- canonical state revalidation  
- ψ₅ and SE gating  
- emergency override checks  

Execution may proceed only if:

- ψ₅ < ψ₅_max  
- SE ≥ SE_min  
- canonical state has not **materially changed**  
- no emergency protocol is active  

**Definition of “material change”:**  
A material change is any modification to an Impact Profile that alters **eligibility, voting weight, domain authority, or emergency classification**.

Execution is a **state transition**, not a procedural action.

---

## **II.6 Post‑Execution Review**
After execution:

- canonical state is updated  
- Impact Profiles are recalculated  
- GCS adjudicates stability  
- calibration recommendations are generated  

This closes the governance loop and prepares the system for the next cycle.