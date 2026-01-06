# ✅ **Governance Refinement Patch — Section 3**  
## **3. Proposal Lifecycle (Escalation Paths, Time Windows, and Stalling Logic)**

This section strengthens Article VI and Article X by defining explicit lifecycle stages, time windows, escalation paths, and stalling behavior. It ensures proposals move predictably through governance, prevents deadlocks, and aligns with the role thresholds defined in Section 2.

---

## **3.1 Proposal Lifecycle Stages (Clarified & Unified)**

Every proposal MUST pass through the following stages:

1. **Creation**  
   - Created by any participant meeting the Reviewer threshold.  
   - Must include: description, target, calldata, rationale, and required artifacts.

2. **Initial Review Window**  
   - Duration: **T_review = 48 hours** (governance‑controlled).  
   - Reviewer‑level participants may comment, request artifacts, or flag incoherence.

3. **Voting Window**  
   - Duration: **T_vote = 72 hours** (governance‑controlled).  
   - Only participants meeting the Approver threshold may vote.

4. **Threshold Check**  
   - Proposal advances if:  
     ```
     votes ≥ T_approver AND no active incoherence flags
     ```

5. **Steward Oversight Window**  
   - Duration: **T_steward = 24 hours**  
   - Stewards may:
     - approve,
     - request additional evidence,
     - escalate to Meta‑Governance,
     - or reject with rationale.

6. **Timelock Scheduling**  
   - If approved, proposal enters the timelock queue.  
   - Minimum delay: **T_delay = governance‑controlled** (default: 48 hours).

7. **Execution**  
   - After timelock expiry, proposal may be executed by any participant.

---

## **3.2 Escalation Paths (New Subsection)**

Escalation ensures proposals do not stall and that anomalies or governance drift are handled predictably.

### **3.2.1 Reviewer Escalation**
Triggered when:

- Reviewer threshold met  
- Approver threshold NOT met  
- T_vote expires  

Action:

- Proposal escalates to Stewards for forced review.

### **3.2.2 Steward Escalation**
Triggered when:

- Stewards do not act within T_steward  
- Proposal has ≥ 2 Reviewer flags  
- Proposal involves security‑critical changes (ψ₅‑impacting)

Action:

- Escalate to Meta‑Governance.

### **3.2.3 Meta‑Governance Escalation**
Triggered when:

- Proposal affects governance thresholds  
- Proposal modifies emergency protocols  
- Proposal modifies Impact Profile formulas  
- Proposal modifies Article III, IV, or X  

Action:

- Meta‑Governance must approve with supermajority.

---

## **3.3 Stalling Logic (New Subsection)**

A proposal is considered **stalled** if:

- It remains in any stage longer than its time window  
- It receives contradictory Reviewer feedback  
- Required artifacts are missing  
- Governance health (ψ₅, SE) enters a stressed regime during review

### **Stalled Proposal Actions**
- Reviewer‑level proposals → auto‑close after 7 days  
- Approver‑level proposals → escalate to Stewards  
- Steward‑level proposals → escalate to Meta‑Governance  
- Meta‑Governance proposals → require explicit vote to close  

This prevents governance deadlocks.

---

## **3.4 Time Windows (Governance‑Controlled)**

All time windows are adjustable via governance:

| Window | Default | Description |
|--------|---------|-------------|
| T_review | 48h | Reviewer commentary |
| T_vote | 72h | Approver voting |
| T_steward | 24h | Steward oversight |
| T_delay | 48h | Timelock delay |
| T_expire | 7 days | Proposal expiration |

These values are stored in governance‑controlled state and versioned.

---

## **3.5 Evidence Requirements (New Subsection)**

Every proposal MUST include:

- rationale  
- expected impact  
- required artifacts (as defined in the playbook)  
- domain relevance  
- threshold justification  

Examples:

- Security proposals → ψ₅_STFT, SE_candlestick  
- Load proposals → workload_csv, divergence_snapshot  
- Governance proposals → aggregated_metrics_chunk  

This ensures proposals are evidence‑based.

---

## **3.6 Integration With Playbook Events (Forward Reference)**

The playbook dataset (2025‑11 → updated 2026‑01‑06) provides:

- severity → role mapping  
- anomaly → action mapping  
- artifact → evidence mapping  
- badge gate → threshold mapping  

These mappings will be formalized in Section X.
