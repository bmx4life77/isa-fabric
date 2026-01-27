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



# **1. Full CHANGELOG Section (Release v0.3.3)**

## **[0.3.3] — CLI Stabilization & Pipeline Alignment**

### **CLI Architecture**
- Fully aligned the CLI with the updated metrics, modulation, and governance engines.
- Standardized command structure across all subsystems:
  - `isa metrics evaluate`
  - `isa governance run`
  - `isa deploy list | history | inspect`
  - `isa evaluate` (full pipeline)
- Ensured consistent flag handling (`--domain`, `--input`, `--proposal`, `--id`).

### **Executable & Developer Experience**
- Added `"bin": { "isa": "./dist/src/cli/isaCli.js" }` to enable global CLI usage via `npm link`.
- Ensured CLI entrypoint is executable during build (`chmod +x`).
- Added npm scripts for all major CLI operations:
  - `metrics:evaluate`
  - `governance:run`
  - `deploy:list`, `deploy:history`, `deploy:inspect`
  - `evaluate` (full pipeline)
  - `isa` (raw CLI access)

### **Metrics Engine Integration**
- Fixed missing telemetry edge‑case handling (drift, volatility, rolling cache).
- Ensured `computeMetrics()` returns both `vu` (raw) and `VU` (normalized) to satisfy tests and modulation.
- Stabilized drift computation for missing or short telemetry arrays.

### **Modulation Layer**
- Added `.macro` and `.raw` fields to modulated output for test compatibility and clarity.
- Ensured modulation output satisfies `ModulatedOutput` interface and governance expectations.

### **Role‑Aware Modulation**
- Updated `roleAwareModulation` to accept both `"reviewer"` and `{ role: "reviewer" }`.
- Added `.weights`, `.macro`, and `.role_adjusted` to output.
- Ensured responsibility profiles load correctly and apply weighting.

### **Build & Schema Integration**
- Ensured schemas are copied into `dist/schemas` during build.
- Verified CLI commands correctly load responsibility profiles, metrics profiles, and domain packs.

## [Unreleased]

### Added
- Introduced full `isa datasets` command group:
  - `--list` for scenario enumeration
  - `--stats` for dataset metadata and metric overview
  - `--scenario <name>` for generating individual or all synthetic datasets
  - `--output <dir>` for custom output paths
- Added synthetic dataset generator with five production scenarios:
  - baseline_normal_7d
  - adversarial_ddos_3d
  - insider_threat_5d
  - supply_chain_4d
  - regulatory_change_10d
- Added automatic manifest generation for dataset batches
- Added dataset path resolver supporting:
  - absolute paths
  - relative paths
  - fallback to `core/dataset/`
  - directory resolution (latest JSON file)

### Changed
- Updated Theta forecasting pipeline:
  - Replaced legacy asset‑based extractor with metric‑based extractor
  - Added support for flat metric names (`beta`, `psi5`, `ESI`, etc.)
  - Added support for domain‑prefixed metric paths (`finance.beta`)
  - Improved error handling for missing metrics
- Refactored `loadDataset` to use new resolver logic
- Cleaned up CLI command registration for `forecast theta`

### Fixed
- Resolved ENOENT path issues when forecasting on generated datasets
- Fixed metric extraction failures caused by outdated schema assumptions
- Corrected CLI behavior for dataset paths outside `core/dataset/`
- Ensured Theta engine correctly reads `entry.metrics` structure

### Notes
- Theta forecasting now fully operational across all synthetic scenarios
- Forecasts validated for `beta`, `psi5`, `ESI`, and `divergence`
- CLI, dataset engine, loader, extractor, and Theta pipeline now integrated end‑to‑end





CHANGELOG.md

[Unreleased] — Last 24 Hours

✨ Documentation Overhaul
- Fully redesigned the README.md into a professional, contributor‑friendly format.
- Streamlined the structure to highlight:
  - ISA Fabric’s purpose and architecture  
  - Key features and design principles  
  - Clean project structure  
  - Installation and environment requirements  
  - Updated CLI command set  
  - Troubleshooting guidance  
- Removed overly long or deeply technical sections from the README and migrated them to docs/ for clarity and maintainability.
- Added clear separation between:
  - Core substrate (ISA Fabric)  
  - Companion sandbox (ISA Metrics GCS)  

📟 CLI Section Modernization
- Integrated the complete, current CLI command tree into the README.
- Added short, precise descriptions for every top‑level command.
- Documented subcommands for:
  - datasets
  - iso
  - benchmark
  - tags
  - adversarial
  - security
  - gcs
  - inspect
  - governance
  - metrics
  - deploy
  - evaluate
  - forecast
- Ensured the CLI documentation now matches the actual output of the tool.

📁 Repository Restructure Planning
- Finalized the recommended new folder structure for ISA Fabric:
  - src/
  - schemas/
  - governance/
  - sce/
  - examples/
  - data/
  - docs/
  - test/
  - contracts/
- Identified which directories should be committed vs. ignored.
- Clarified handling of dev dependencies and runtime artifacts.
- Prepared the repo for a clean, intentional reorganization.

📦 ISA Metrics GCS (Python Sandbox) — Architectural Decision
- Determined that ISA Metrics GCS should live in a separate repository, not inside ISA Fabric.
- Established the relationship:
  - ISA Fabric = substrate  
  - ISA Metrics GCS = sandbox / companion engine  
- Outlined the benefits of separation:
  - cleaner boundaries  
  - clearer contributor expectations  
  - independent release cycles  
  - language‑specific ecosystems remain isolated  

📄 MANIFEST.in Review & Improvements
- Reviewed the existing MANIFEST and confirmed it includes:
  - README  
  - LICENSE  
  - examples  
  - docs  
  - aggregated metrics  
  - tests  
- Provided a refined, production‑ready version including:
  - exclusion of build artifacts  
  - exclusion of pycache  
  - inclusion of internal JSON/YAML assets  

📚 Sphinx Documentation Review
- Validated the conf.py structure for ISA Metrics GCS.
- Confirmed autodoc configuration is correct.
- Suggested optional enhancements (Napoleon, static paths, version metadata).

🧠 Architectural Clarification & Ecosystem Guidance
- Clarified the conceptual boundaries between:
  - ISA Fabric (core substrate)
  - ISA Metrics GCS (sandbox engine)
- Reinforced the safety‑first, advisory‑only nature of GCS.
- Confirmed that creating a Python module was not only appropriate but strategically valuable.
- Provided guidance on how to present the ecosystem to contributors and reviewers.

## **Unreleased — January 25–26, 2026**

### **✨ Added**
- **Spec Compliance Engine (SCE) CLI integration**
  - Introduced the new command group `isa sce`.
  - Added `isa sce evaluate` for rule‑driven contract evaluation.
  - Implemented nested command registration for clean CLI hierarchy.

- **SCE Evaluator Engine**
  - Added `sce/core/evaluator.ts` implementing rule evaluation, severity handling, and execution recommendations.
  - Added structured evaluation output including:
    - Rule results  
    - Severity levels  
    - Governance actions  
    - Serial/parallel execution hints  
    - Summary block  

- **Declarative Rule Pack**
  - Added `sce/rules/sce-rules.json` containing:
    - psi5 security threshold rule  
    - confidence floor rule  
    - governance threshold enforcement  
    - semantic-layer validation rule  

- **Canonical Artifact Schema**
  - Added `src/artifacts/schema.ts` defining the unified artifact structure consumed by the SCE.
  - Added `src/artifacts/loadArtifact.ts` to merge NatSpec++, compiler metadata, and source information.

- **CLI Improvements**
  - Ensured `isaCli.ts` uses a proper shebang and invokes `buildCLI()` cleanly.
  - Added global CLI installation support via `npm link`.
  - Cleaned up command registration and removed phantom/unimplemented command hooks.

### **🛠️ Changed**
- Refactored CLI root (`src/cli/index.ts`) to:
  - Export `buildCLI()` properly.
  - Register all command groups consistently.
  - Integrate SCE commands without leaking evaluator logic into the CLI root.
- Updated folder structure to support:
  - `src/natspec/` for NatSpec++ ingestion  
  - `sce/` as a top‑level subsystem  
  - Clean separation between runtime engines and TypeScript source  

### **🐛 Fixed**
- Resolved CLI build errors caused by missing exports in `src/cli/index.ts`.
- Fixed PATH issues preventing the `isa` command from being recognized after build.
- Corrected command registration to ensure nested commands appear in `isa --help`.

### **📁 Infrastructure & Structure**
- Created new directories:
  - `sce/core/`
  - `sce/rules/`
  - `sce/spec/`
  - `sce/types/`
- Ensured build output includes CLI entrypoint and schema assets.
- Added proper `bin` mapping in `package.json` for global CLI usage.

### **🚀 Operational Milestone**
- Successfully executed the first full SCE evaluation:
  ```
  isa sce evaluate --file contracts/KctiDAOImpactProfiles.sol
  ```
  Producing:
  - 2 passes  
  - 2 fails  
  - Governance gate enforcement  
  - Serial execution recommendation  

This marks the first fully operational end‑to‑end run of the SCE pipeline.
