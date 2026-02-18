```markdown
# 📘 **Annotation Instruction Guide (Formalized)**  
### *NatSpec++, Governance Tags, Semantic Layers, and Hardhat Compatibility*

---

## **1. Purpose of This Guide**

This document defines the **canonical annotation rules** for:

- NatSpec++ metadata  
- Governance tags  
- Benchmarking tags  
- Semantic-layer tags  
- RASUV Triad references  
- Hardhat-compatible custom tags  
- Linting rules for contributor consistency  

These rules ensure that annotations:

- compile safely under Hardhat and other Solidity compilers  
- provide rich, machine-readable metadata  
- separate concerns cleanly (telemetry vs. governance)  
- support linting, documentation generation, and governance verification

---

## **2. NatSpec++ — Telemetry & Dynamic Metadata Only**

**NatSpec++ is strictly a telemetry and dynamic metadata layer.**  
It has **no governance authority**, **no constitutional binding**, and **no influence** on ψ₅, SE, envelope deltas, divergence classification, or any other governance mechanism in ISA Fabric.

NatSpec++ is **read-only** for the governance organism — it exists solely to:

- expose runtime telemetry (psi5, se, esi, integration-coverage, etc.)  
- aid developer tooling, documentation, and monitoring  
- provide semantic hints for human readers and external indexers
-annotation in Solidity smart contracts *Diamond Standard ONLY - Absolutely no legacy

### NatSpec++ Rules

1. **Prefix**: Always use `/// @custom:natspecpp`
2. **Version**: Include `v0.2` (or later)  
3. **Format**: `key:value` pairs, comma-separated  
4. **Allowed keys** (non-exhaustive, telemetry-focused):

   - `psi5:security-ratio=<float>`  
   - `se:system-efficiency=<float>`  
   - `esi:efficiency-stability-index=<float>`  
   - `phi:integration-coverage=<float 0–1>`  
   - `semantic-layer=<string>` (governance | security | composite | etc.)  
   - `telemetry-version=<string>`  
   - `monotonicity-check=<pass|fail>` (runtime hint only)

5. **Forbidden**:
   - Any governance directive (timelock, threshold, authority, override, etc.)  
   - Any value that could influence ψ₅/SE gating, calibration, or divergence  
   - Any attempt to bind or override constitutional invariants

**Example (valid NatSpec++)**

```solidity
/// @custom:natspecpp v0.2 psi5:security-ratio=0.89 semantic-layer=security
/// @custom:natspecpp v0.2 se:system-efficiency=85.3
/// @custom:natspecpp v0.2 esi:efficiency-stability-index=87.1
/// @custom:natspecpp v0.2 phi:integration-coverage=0.92
contract TreasuryModule {
    // ...
}
```

**Example (invalid — rejected by linter)**

```solidity
/// @custom:natspecpp psi5:lt:0.3 authority=exclusive  ← governance directive
```

---

## **3. Governance Tags — Constitutional & Binding**

Governance tags **MUST NOT** be placed under `@custom:natspecpp`.  
They are separate, constitutionally authoritative, and parsed by Pneuma/BIV.

**Prefix**: `/// @custom:governance`

**Allowed keys** (non-exhaustive):

- `timelock=<duration>` (e.g., 2days, 48h)  
- `multisig=<m-of-n>` (e.g., 3of5)  
- `threshold=psi5:lt:0.3`  
- `invariant-ref=V5.2`  
- `bep-phase=3` (for amendment context)  
- `rollback-target=Corpus-v5.0.0`

**Example (valid governance tag)**

```solidity
/// @custom:governance timelock=2days multisig=3of5 threshold=psi5:lt:0.3
/// @custom:governance invariant-ref=V5.4
contract GovernanceCore {
    // ...
}
```

**Rule**: Governance tags are **never** telemetry. They are **never** parsed as NatSpec++.  
They are **read by Pneuma** during evaluation and **verified by BIV**.

---

## **4. Semantic-Layer Tags**

Used to provide human-readable context for external tools and documentation.

**Prefix**: `semantic-layer=`

Allowed values (expandable via BEP):

- governance  
- security  
- composite  
- economic  
- recovery  
- verifiability  

**Placement**: Inside NatSpec++ only (telemetry context).

```solidity
/// @custom:natspecpp v0.2 semantic-layer=governance
```

---

## **5. RASUV Triad References**

Used to link to constitutional invariants (ψ₅, SE, etc.).

**Format**:

```solidity
/// @custom:rasuv ψ₅:lt:0.72 SE:ge:0.84
```

**Placement**: Governance tags only — **never** in NatSpec++.

---

## **6. Linting Rules**

1. NatSpec++ MUST NOT contain governance keywords (timelock, threshold, invariant, rollback, etc.).  
2. Governance tags MUST NOT appear inside `@custom:natspecpp`.  
3. All `@custom:natspecpp` MUST include `v0.2` or later.  
4. Duplicate keys in NatSpec++ are warnings.  
5. Unknown telemetry keys are warnings (allow future expansion).  
6. Governance tags require explicit BIV verification during deployment/evaluation.

---

## **7. Summary — Strict Separation**

- **NatSpec++** → developer telemetry, dynamic, non-authoritative  
- **Governance tags** → constitutional, binding, parsed by Pneuma/BIV  
- **No crossover allowed** — this separation is constitutionally enforced.

This ensures telemetry remains helpful without ever threatening governance integrity.
```

This version:

- Clearly separates NatSpec++ (telemetry only, no governance authority) from governance tags  
- Reinforces the constitutional boundary you emphasized  
- Adds explicit linting rules to prevent crossover  
- Keeps the document formal, concise, and actionable for contributors and tooling  