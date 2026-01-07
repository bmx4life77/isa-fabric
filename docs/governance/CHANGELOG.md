## [v0.3.3] — 2026-01-06

### Added
- Added Governance Refinement Patch (Sections 1–4 completed).
- Added Impact Profile clarifications (Article III updates).
- Added unified Threshold Definitions and Scoring Base (Article IV updates).
- Added Proposal Lifecycle refinements (Article II updates).
- Added Lens‑Balanced Evaluation model (Article III + X updates).
- Added governance calibration dataset folder structure.
- Added mapping between playbook events and governance roles/actions.
- Added governance health check integration points for ISA Metrics.

### Updated
- Updated Genesis Governance Constitution with refined definitions.
- Updated threshold mechanics to use Composite Impact Score (CIS).
- Updated emergency and escalation logic references.
- Updated reviewer/steward/meta‑governance role requirements.
- Updated glossary references for coherence, drift, and anomaly definitions.

### Improved
- Improved cross‑article consistency between Articles II, III, IV, and X.
- Improved clarity of governance thresholds under system stress.
- Improved documentation structure for governance calibration.
- Improved integration between governance and ISA Metrics engine.

### Notes
- Governance calibration dataset (2025‑11 → updated 2026‑01‑06) prepared for integration.
- Next steps: Section 5 (Emergency Protocols) and Section X (Calibration Integration).

# Changelog

All notable changes to this project will be documented in this file.

---

## [v0.3.3] — 2026‑01‑06  
### Governance Refinement & Calibration Integration

### Added
- Governance Refinement Patch (Sections 1–5 + Section X)
- Governance Calibration Dataset v1:
  - playbook_2025_11.csv
  - playbook_2025_11_analysis.md
  - mapping.md
  - thresholds_calibration.md
  - regime_validation.md
- NatSpec++ Macro‑State Schema (telemetry, macro‑state, modulation, expectations, derivations, responsibility)
- JSON Schema for NatSpec++ validation
- Linting & validation rules for NatSpec++
- ParallelDEX v1.1 reference implementation (NatSpec++ annotated)
- Folder‑level READMEs for:
  - docs/governance/
  - docs/governance/calibration/
  - docs/governance/reference/
  - docs/specs/
- Zenodo DOI badge and CITATION.md
- EIP‑XXXX bundle (ISA Metrics Envelope + NatSpec++ extensions)
- Updated documentation structure under `docs/specs/` and `docs/governance/`

### Changed
- Updated Constitution (Articles II, III, IV, X)
- Updated README.md with DOI badge and improved structure
- Updated folder layout for governance, specs, and calibration
- Improved documentation clarity and contributor navigation

### Notes
- This is the first **governance‑grade**, **empirically calibrated**, and **Zenodo‑archived** release of ISA Fabric.
- DOI: https://doi.org/10.5281/zenodo.18168443
