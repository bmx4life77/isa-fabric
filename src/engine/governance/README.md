# ISA Fabric — Governance Engine

The Governance Engine evaluates proposals, thresholds, and governance health using metrics and modulated signals. It implements the governance logic defined in the Constitution and Refinement Patch.

## Responsibilities

- Lens‑balanced evaluation (Reviewer, Steward, Emergency, Calibration)
- Threshold enforcement (ψ₅, SE, expedited review)
- Governance health checks
- Proposal lifecycle evaluation
- Emergency protocol logic

## Typical Files

- `evaluate.*` — lens‑balanced evaluation
- `thresholds.*` — threshold enforcement
- `health_check.*` — governance health checks
- `proposal_lifecycle.*` — lifecycle logic
- `types.*` — shared interfaces
