# **Replay-Verifiable Execution Plan Format v1.1**  
### *Canonical for ISA Fabric v6.0*

**Status:** Canonical – Ready for BEP-v6-008  
**Version:** v1.1
**Supersedes:** v1.0
**Depends on:**  
- Execution Envelope Specification v1.6  
- NatSpec++ v2 Semantic Intent Schema v2.4  
- Unified Embedding Doctrine v0.6  
- Quantum Alignment Extensions (Articles 4.5 & 4.6)  
- Societal Telemetry Doctrine (Article XXX)

**SHA-256:** *47e7fd70cfe61e1c40cd4cf2c29294cd0a3eb4f3c026c58e969b3df686cf37f7*

---

## **Section 1 — Purpose and Role**

The Replay-Verifiable Execution Plan is the **single source of truth** for every execution that occurs within ISA Fabric v6.0.  

It is the canonical, sealed record that captures:
- The original semantic intent (NatSpec++ v2)
- The computed Execution Envelope triple (P, S, E)
- All input data used for classification
- The resulting state changes and lineage updates
- Sufficient metadata to allow exact deterministic replay and BIV verification

Its purpose is to guarantee **non-regression, auditability, and constitutional integrity** across the entire system. No execution is considered complete until its Replay-Verifiable Execution Plan has been sealed into BLVDB Anima.

**No plan → no execution. No sealed plan → no constitutional finality.**

---

## **Section 2 — Core Structure (Canonical JSON Schema)**

Every Replay-Verifiable Execution Plan SHALL be a JSON object with the following top-level structure:

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

All fields are mandatory unless explicitly marked optional. The entire object MUST be cryptographically hashed (SHA-256) and the hash sealed into BLVDB Anima as the authoritative record.

“All thresholds SHALL be the exact values passed into ClassifyEnvelope and MUST be recorded to prevent threshold drift.”

---

## **Section 3 — Key Fields and Doctrinal Mapping**

- **semanticIntent** — Direct output from NatSpec++ v2 parser (Section 5 of NatSpec++ v2 schema). Must include full enriched object.
- **envelope** — The final (P, S, E) triple computed by ClassifyEnvelope. Immutable once assigned.
- **inputs** — Complete snapshot of all data fed into classification (M, G, Q, Σ(t), Σ_society(t)). Must be sufficient for exact replay.
- **thresholds** — All configurable values used during classification. Must be explicitly recorded to prevent threshold drift.
- **replayMetadata** — Versioning and combined hash for BIV verification. The `replayHash` is the canonical fingerprint of the entire plan.

---

## **Section 4 — Sealing and Storage Requirements**

- The complete plan object SHALL be sealed into BLVDB Anima immediately upon execution completion (or failure).
- The `replayHash` SHALL be stored as the primary key for lineage and audit lookups.
- All plans are **immutable** after sealing. Any modification attempt is a constitutional violation.

---

## **Section 5 — BIV Verification Requirements**

BIV SHALL perform the following deterministic checks for every plan:

1. Re-parse the original source NatSpec++ v2 block against the recorded TagBank version.
2. Re-execute `ClassifyEnvelope` using the exact recorded inputs and thresholds.
3. Assert that the computed envelope triple exactly matches the recorded envelope.
4. Verify that no forbidden combinations (Execution Envelope Spec Section 5.1) were present.
5. Confirm κ_align compliance if quantum state is present.
6. Recompute the `replayHash` and assert match with the stored value.

Any divergence is flagged as a constitutional violation and triggers lineage review.

---

## **Section 6 — Constitutional Guarantees**

- The Replay-Verifiable Execution Plan is the **single source of truth** for what actually executed.
- It enforces non-regression, drift resistance, and quantum resistance at the plan level.
- It makes every execution auditable, replayable, and verifiable against the full v6.0 corpus.
- No execution is constitutionally final until its plan is sealed.

**No sealed plan → no constitutional finality.**

---

**End of Replay-Verifiable Execution Plan Format v1.1**  
*Sealed under ISA Fabric Genesis Governance v6.0 — April 2026*

**SHA-256:** *47e7fd70cfe61e1c40cd4cf2c29294cd0a3eb4f3c026c58e969b3df686cf37f7*