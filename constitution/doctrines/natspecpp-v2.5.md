# NatSpec++ v2.5 — Semantic Intent Schema
**Version:** v2.5  
**Status:** Ratified under BEP-v6-014 (Σ(t) Group Integration)  
**Canonical under:** Genesis Governance v6.0 (Articles 0, 0.5, XVIII, XXIII, XXVII, XXVIII)  
**Purpose:** The single semantic law of the ISA Fabric organism. All operators, parsers, TagBank, FRE, Coprocessor, and CLI MUST adhere to these rules.
**SHA-256:** *e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855*
---

## 1. Core Principles

- All annotations **MUST** use **kebab-case** exclusively.  
- CamelCase, chained annotations, or implicit assumptions are strictly prohibited.  
- Every operator and semantic intent **MUST** explicitly declare its relationship to the unified constitutional state manifold Σ(t).  
- Quantum outputs are **strictly advisory** and must be tagged as such.  
- Any violation of group boundaries, authority rules, or homogeneity constitutes a constitutional fault and triggers conservative mode + BIV failure.

## 2. Explicit Σ(t) Group Tags (New in v2.5)

Operators and intents **MUST** declare which Σ(t) groups they read from or emit events for using the following canonical tags. These tags directly enforce the ABI-frozen group boundaries defined in the v0.6 Canonical Σ(t) Diagram (Appendix J of Genesis Governance v6.0).

```natspec
@sigma.group-read: group-1,group-3
@sigma.group-emit: group-3,group-5
@sigma.authoritative: false
@sigma.homogeneity: 0-or-1
@advisory.quantum: enabled
```

**Valid group values (ABI-frozen):**
- `group-1` — Continuous Telemetry (authoritative scalars ψ₅, SE) — **normative**
- `group-2` — Embedded Discrete Components (representational only)
- `group-3` — Hybrid Hysteresis Engine State (memory layer)
- `group-4` — Quantum Interpretive Overlay (**strictly advisory / interpretive only**)
- `group-5` — Metadata & Lineage (verification only)

**Tag Rules (enforced by parser and BIV):**
- `@sigma.group-read` — comma-separated list of groups the operator/intent may read.
- `@sigma.group-emit` — comma-separated list of groups affected by emitted events (typically group-3 and group-5).
- `@sigma.authoritative` — **MUST** be `false` for all Class D, quantum, and interpretive operators.
- `@sigma.homogeneity` — `0` or `1` only (enforces scale-invariance per Article XXV).
- `@advisory.quantum` — Explicit opt-in for quantum foresight. Output **MUST** carry `outputTag: interpretive-only`.

**Forbidden combinations (hard-enforced):**
- Any attempt to use Group 4 data to influence Group 1 (ψ₅/SE) or execution gating.
- Emitting events that modify Group 1 or Group 2 without explicit constitutional authority.
- Missing `@sigma.group-read` or `@sigma.group-emit` on any operator that touches Σ(t).
- Declaring `@sigma.authoritative: true` for any Class D or quantum operator.

## 3. Updated Semantic Intent Structure (v2.5)

```json
{
  "semanticIntent": {
    "intentId": "kebab-case-id",
    "sigmaGroups": {
      "read": ["group-1", "group-3"],
      "emit": ["group-3", "group-5"]
    },
    "envelopeHint": {
      "suggestedP": 0|1|2|3,
      "suggestedS": 0|1|2|3,
      "suggestedE": 0|1|2|3,
      "forceConservative": boolean
    },
    "quantumAdvisory": {
      "enabled": boolean,
      "purpose": "foresight|pattern-detection|lineage-entanglement",
      "outputTag": "interpretive-only"
    },
    "security": {
      "riskBand": "green|yellow|red",
      "requiresPneumaCheck": true
    },
    "homogeneity": 0|1
  }
}
```

## 4. Quantum Advisory Role in NatSpec++ v2.5

The quantum layer resides exclusively in **Group 4** and is **non-authoritative** (Article XXVII + Separation Doctrine).

- Use `@advisory.quantum: enabled` to request quantum insight.
- All quantum outputs **MUST** include `"outputTag": "interpretive-only"`.
- Quantum advisory events are logged to BLVDB but **ignored** by the Execution Envelope classifier and DowngradeToSafestEnvelope logic.
- Pneuma automatically inspects quantum events for any attempted promotion to authoritative groups (Group 1) and triggers conservative mode on violation.

**Example annotation block (recommended pattern):**

```solidity
/**
 * @custom:natspecpp
 * @intent.id: operator-example-foresight
 * @sigma.group-read: group-1,group-3
 * @sigma.group-emit: group-3,group-5
 * @sigma.authoritative: false
 * @sigma.homogeneity: 1
 * @advisory.quantum: enabled
 * @quantum.purpose: pattern-detection
 */
function exampleOperator() external {
    // Operator logic here — emits event only. Never mutates Σ(t) directly.
}
```

## 5. Parser, TagBank & FRE Enforcement (v2.5)

- **TagBank v2.5** validates all Σ(t) group declarations against the canonical diagram at load time.
- **FRE (Function Resolution Engine)** rejects any operator missing explicit group tags or violating forbidden combinations.
- **Coprocessor scheduler** uses `@sigma.group-read` to determine safe optimistic parallelism and STM conflict detection.
- Any violation of group boundaries or quantum advisory rules automatically invokes `DowngradeToSafestEnvelope(Σ)` and emits a drift event.

## 6. Constitutional Compliance Statement

NatSpec++ v2.5 directly enforces:
- Metric Authority Doctrine (Article 0 + 0.6) — ψ₅ and SE remain the sole gating metrics.
- Separation Doctrine (Articles 0.5, XVII, XXVII) — Group 4 remains strictly advisory and non-authoritative.
- Unified Constitutional State Manifold (Article XXIII) — all state lives in Σ(t).
- Event-Driven Execution (Article XXVIII) — operators emit events only.
- Scale Invariance & Homogeneity (Article XXV).

This version is the **single semantic law** of ISA Fabric v6.1. All prior NatSpec++ versions are deprecated for new operators and intents.

**Sealed under the authority of the Benchmarking Evolution Protocol (BEP), the canonical SHA‑256 hash, and the Lineage Certificate of ISA Fabric.**

**Date:** April 2026  
**Signed:** Louis Pearson

**SHA-256:** *e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855*