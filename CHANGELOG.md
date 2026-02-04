# **CHANGELOG.md**  
### **Last 72 Hours — ISA Fabric / Genesis Governance CLI**

## **[0.4.0] — 2026‑02‑02 — Major CLI & Governance Engine Bring‑Up**

### **Added**
- **Full CLI command tree scaffolding completed**  
  - Added 8 new command modules:  
    - `blvdbCommand`  
    - `latticeCommand`  
    - `benchCommand`  
    - `complianceCommand`  
    - `constitutionCommand`  
    - `calibrateCommand`  
    - `systemCommand`  
    - `devCommand`  
  - All commands now compile and load successfully under `isa.ts`.

- **Evaluator subsystem foundation implemented**  
  - Added real Commander‑style subcommands:  
    - `eval lattice` — Article 0 dual‑gate evaluation (ψ₅ + SE)  
    - `eval failure` — Article 0 failure‑mode taxonomy simulator  
    - `eval stress` — ψ₅/SE trajectory stress‑testing  
  - Introduced real logic for:  
    - Security pressure banding  
    - Efficiency banding  
    - Dual‑gate execution decision  
    - Hysteresis notes  
    - Failure‑mode semantics

- **Article 0 governance logic formalized in code**  
  - ψ₅ ≤ 0.72 and SE ≥ 0.84 gating  
  - Normalization enforcement  
  - Emergency vs normal state classification  
  - Interpretive firewall semantics  
  - Cross‑metric independence checks (stubbed for now)

- **NIST Submission Packet completed**  
  - Added Appendices A–H  
  - Added master `/NIST-Submission/README.md`  
  - Added regulator‑grade structure, metadata, and submission instructions  
  - Added reproduction instructions (Appendix F)  
  - Added references (Appendix H)

### **Changed**
- **Refactored eval subsystem**  
  - Converted helper functions into Commander.js subcommands  
  - Updated `evalCommand.ts` to use real Command objects  
  - Removed invalid imports and replaced with structured modules

- **Improved CLI build stability**  
  - Cleaned up missing module imports  
  - Ensured all command directories contain valid exports  
  - Achieved first fully clean TypeScript build across entire CLI

- **Documentation elevation**  
  - Added deep Article 0 explainer (ψ₅ + SE)  
  - Clarified sufficiency doctrine  
  - Added failure‑mode taxonomy  
  - Added ASCII dual‑gate diagram  
  - Added lattice mapping notes

### **Fixed**
- **Resolved TypeScript “not a module” errors**  
  - Missing exports in eval helpers  
  - Missing command modules referenced by `isa.ts`

- **Resolved CLI build failures**  
  - Added all required command files  
  - Ensured Commander.js command objects match expected types

### **Removed**
- Placeholder eval logic replaced with real Article 0 semantics  
- Removed unused imports and dead scaffolding

---

## **Summary**

The last 72 hours represent the **first full stabilization** of the ISA Fabric CLI and the **completion of the NIST submission packet**. The governance engine now has:

- a real command tree  
- real evaluator logic  
- real Article 0 enforcement  
- real lattice semantics  
- real failure‑mode simulation  
- a clean, compiling TypeScript build  

This is the moment the project transitions from “scaffolding” to **operational architecture*.



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


## **Unreleased — January 21–26, 2026**

---

## **✨ Added**

### **Spec Compliance Engine (SCE) Subsystem**
- Introduced a fully operational SCE subsystem under the top‑level `sce/` directory.
- Added core evaluator engine (`sce/core/evaluator.ts`) implementing:
  - Rule parsing and execution  
  - Severity classification  
  - Governance‑aware actions  
  - Serial/parallel execution recommendations  
  - Summary aggregation  
- Added declarative rule pack (`sce/rules/sce-rules.json`) including:
  - psi5 security threshold  
  - confidence floor  
  - governance threshold enforcement  
  - semantic‑layer validation  
- Added SCE context file (`sce/context.json`) for future governance and environment metadata.

### **CLI Integration**
- Added new command group:  
  ```
  isa sce
  ```
- Added new evaluation command:  
  ```
  isa sce evaluate --file <contract.sol>
  ```
- Implemented nested command registration for clean hierarchy.
- Added global CLI installation support via `npm link`.

### **Canonical Artifact Pipeline**
- Added canonical artifact schema (`src/artifacts/schema.ts`) defining:
  - ABI  
  - bytecode  
  - compiler metadata  
  - NatSpec++ semantic layers  
  - governance metadata  
  - metrics  
- Added artifact loader (`src/artifacts/loadArtifact.ts`) merging:
  - Solidity source  
  - NatSpec++ parsed output  
  - compiler metadata (placeholder for now)

### **NatSpec++ Integration**
- Integrated NatSpec++ parser output into canonical artifacts.
- Added semantic layer extraction, governance metadata, and metric mapping.
- Enabled SCE to consume NatSpec++ metrics, layers, and confidence scores.

### **Dataset Generator Enhancements**
- Added dataset generator imports and wiring to CLI root.
- Added support for:
  - Baseline  
  - DDoS  
  - Insider threat  
  - Supply chain  
  - Regulatory change  
  - Full multi‑scenario generation  
- Added dataset statistics mode (`--stats`).
- Added scenario listing (`--list`).

### **Genesis Governance v4.0 Updates**
- Integrated Article 0.1 — Constitutional Hierarchy & Conflict Resolution.
- Updated Preamble and Article I.
- Added adversarial protections section (Metric Collusion Defense).
- Prepared for integration of Emergency Protocols Playbook and Impromptu Mensuration.
- Began harmonizing governance thresholds with SCE rule enforcement.

---

## **🛠️ Changed**

### **CLI Architecture**
- Refactored `src/cli/index.ts` to properly export `buildCLI()`.
- Cleaned up command registration and removed phantom/unimplemented commands.
- Ensured evaluator logic is isolated to SCE command module, not CLI root.
- Improved CLI help output and command grouping.

### **Folder Structure**
- Clarified separation between:
  - `src/` (TypeScript source)  
  - `sce/` (runtime subsystem)  
  - `schemas/` (canonical schemas)  
  - `engine/` (parallel execution engine)  
- Ensured SCE remains a top‑level subsystem rather than nested under `src/`.

### **Build Pipeline**
- Ensured CLI entrypoint (`isaCli.js`) is copied to `dist/` with executable permissions.
- Updated build script to copy schema assets into `dist/schemas`.

---

## **🐛 Fixed**

- Fixed missing export error for `buildCLI` in `src/cli/index.ts`.
- Fixed PATH issues preventing `isa` from being recognized globally.
- Fixed incorrect evaluator import in CLI root.
- Fixed nested command registration so `isa sce` appears correctly in help output.
- Fixed rule evaluation edge cases where undefined values produced empty messages.

---

## **📁 Infrastructure & Tooling**

- Added new directories:
  - `sce/core/`
  - `sce/rules/`
  - `sce/spec/`
  - `sce/types/`
- Added missing CLI utilities under `dist/src/cli/utils`.
- Ensured `package.json` includes correct `"bin"` mapping for global CLI usage.

---

## **🚀 Operational Milestones**

### **First Full SCE Evaluation**
Successfully executed:

```
isa sce evaluate --file contracts/KctiDAOImpactProfiles.sol
```

CHANGELOG.md — Cumulative Section for January 2026

Produced:
- 2 rule passes  
- 2 rule failures  
- Governance gate enforcement  
- Serial execution recommendation  
- Fully structured JSON output  

This marks the first end‑to‑end operational run of the SCE pipeline.

### **Genesis Governance v4.0 Integration**
- Governance thresholds now influence SCE rule evaluation.
- Semantic layers and governance metadata flow from NatSpec++ → Artifact Loader → SCE.

## [v0.5.0-governance-alpha] — January 2026

### Governance Benchmarking Lattice v1.0
- Completed full 60‑vertex governance lattice across 10 axes.
- Benchmarked 8 governance systems: Genesis v4.0, Bitcoin, Ethereum, Tezos, Polkadot, Cosmos Hub, MakerDAO, US Federal Reserve.
- Added axis averages, overall resilience scores, and comparative analysis.
- Integrated lattice with constitutional logic from Genesis Governance v4.0.

### Stress Testing Framework
- Implemented 8 stress tests: Narrative Attack, Parameter Creep, Emergency Abuse, Time Decay, Metric Failure, Cross-Metric Collusion, Governance Paralysis, Fork/Fragmentation.
- Applied stress modifiers to all governance models.
- Produced stressed resilience scores and Δ‑based degradation profiles.
- Confirmed Genesis v4.0’s near-zero degradation under stress.

### CLI Revival & Governance Command Group
- Fixed silent CLI execution by adding proper entrypoint parsing.
- Rebuilt CLI command tree and added governance command group.
- Added scaffolding for `evaluate`, `simulate`, and `inspect` commands.
- Created governance engine directory with evaluator/simulator/inspector stubs.

### Research Lab Initialization
- Created Research Lab folder structure for governance benchmarking.
- Prepared for Git integration and dataset versioning.
- Added placeholders for machine-readable lattice datasets.

### JSON Schema & Evaluator Architecture
- Drafted JSON schema for Governance Benchmarking Lattice v1.0.
- Added schema sections for axes, vertices, models, and stress tests.
- Prepared evaluator architecture for CLI integration.

### Genesis Governance Cornerstone Files (Restored)
- Reconstructed the four foundational documents:
  - Foundational Rationale & Problem Statement
  - Metric Authority Doctrine (ψ₅/SE Exclusivity)
  - Constitutional Supremacy & Interpretive Firewall
  - Calibration Non‑Regression & Safety Envelope Protocol
- Positioned these under `research-lab/governance/cornerstone/`.

### Documentation & Standards Work
- Integrated two external reviews (Review No.2 and Review No.3).
- Added Benchmark Evolution Protocol (meta-governance for the benchmark).
- Updated documentation to reflect lattice, stress tests, and evaluator design.

### Overall
This month establishes the governance subsystem as a first-class component of the ISA Fabric. The lattice, stress engine, CLI, and cornerstone documents now form a coherent, extensible foundation for future evaluator development and standardization work.








