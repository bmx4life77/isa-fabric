
# ⭐ **ISA Fabric — README v0.3**  
*A modular research framework for structured metrics, semantic annotations, and pre‑on‑chain security analysis.*

[![GitHub license](https://img.shields.io/github/license/bmx4life77/isa-fabric)](https://github.com/bmx4life77/isa-fabric/blob/main/LICENSE)
[![CLI](https://img.shields.io/badge/CLI-ready-green)](https://github.com/bmx4life77/isa-fabric)
[![Documentation](https://img.shields.io/badge/wiki-available-blue)](https://github.com/bmx4life77/isa-fabric/wiki)
[![SCE](https://img.shields.io/badge/SCE-governance--aware-purple)](https://github.com/bmx4life77/isa-fabric)

DOI: [10.5281/zenodo.18168443](https://doi.org/10.5281/zenodo.18168443)

ISA Fabric is a **domain‑agnostic metrics and analysis framework** designed to measure, benchmark, and evaluate complex systems. It provides structured pipelines for:

- semantic annotations (NatSpec++),  
- orthogonal metrics (ISA Metrics),  
- governance and proposal analysis,  
- adversarial simulations,  
- dataset generation,  
- and stability forecasting.

The framework is built for researchers, engineers, auditors, and governance professionals who need **reproducible, schema‑validated, versioned analysis workflows**.

---

# 🌐 **What ISA Fabric Is**

ISA Fabric is a **research substrate** — a structured environment for:

- analyzing proposals,  
- computing metrics,  
- generating envelopes,  
- running adversarial simulations,  
- and evaluating system stability.

It is **not** a governance system, standard, or authority layer.  
It is a **toolbox** for structured analysis.

It is designed to be:

- **Extensible** — new rule packs, domain packs, and governance modules
- **Transparent** — declarative rules, auditable artifacts
- **Composable** — CLI, SCE, NatSpec++, datasets, governance
- **Future‑proof** — built for long‑term stewardship and contributor onboarding

---

# 🚀 **Key Features**

### **NatSpec++ Semantic Annotations**  
Machine‑readable metadata for metrics, governance thresholds, and system semantics.  
Hardhat‑compatible via `@custom:<tag>` syntax.

### **ISA Metrics (β, ι, φ, VU, ψ₅)**  
A modular metrics engine with:

- ψ‑family propagation  
- RASUV decomposition  
- regime classification  
- composite indices (ESI, SE, CRI, CBI)

### **Schema‑Validated Artifacts**  
All envelopes, profiles, models, and datasets are validated with Zod schemas.

### **Versioned Deployments**  
Artifacts are stored in:


.isa/deployments/
  envelopes/
  profiles/
  models/
  artifacts/
  active/


### **Modular CLI**  
A unified CLI for metrics, governance, datasets, adversarial analysis, ISO alignment, and more.

### **Cybersecurity Domain Pack**  
Prebuilt structures for CIS Controls v8, MITRE ATT&CK, NIST CSF, and more.

---

# 📁 **Project Structure**


isa-fabric/
├── src/                # Core TypeScript source
├── dist/               # Compiled output
├── docs/               # Extended documentation
├── data/               # Sample datasets
├── schemas/            # Zod schemas
├── contracts/          # Solidity contracts with NatSpec++
├── test/               # Mocha/Chai tests
└── .isa/deployments/   # Versioned artifacts


Advanced documentation (metrics, governance, NatSpec++, RASUV, etc.) has been moved to `docs/` for clarity.

---

# 🧩 **Installation**

### **Prerequisites**
- Node.js **20.19.6+**  
- npm (use `--legacy-peer-deps`)  
- TypeScript  
- Optional: Hardhat for Solidity workflows  
- Recommended: WSL2 on Windows  

### **Install**

npm install --legacy-peer-deps
npm run build


### **Build Script**
Add this to `package.json` for WSL compatibility:


"build": "tsc -p tsconfig.json && cp -r src/schemas dist/schemas && chmod +x dist/cli/isaCli.js"


---

# ⚡ **ISA Fabric CLI Reference**

The ISA Fabric CLI provides a unified interface for evaluating artifacts, running governance simulations, generating datasets, benchmarking, forecasting, and performing deployment operations.  
It is designed to be:

- **Deterministic**  
- **Contributor‑friendly**  
- **Extensible**  
- **Constitutionally aligned**  

Run the CLI:


isa --help


---

## 🧭 Command Groups Overview

| Command Group | Purpose |
|---------------|---------|
| `sce`         | Spec Compliance Engine |
| `inspect`     | Artifact and envelope inspection |
| `datasets`    | Dataset utilities |
| `metrics`     | Metric extraction and scoring |
| `governance`  | Governance evaluation |
| `tags`        | NatSpec++ tag utilities |
| `benchmark`   | Benchmarking tools |
| `iso`         | ISO alignment and reporting |
| `security`    | Security framework mapping |
| `adversarial` | Adversarial simulations |
| `gcs`         | Golden Calibration Series |
| `deploy`      | Deployment utilities |
| `forecast`    | Forecasting models |

Each command group contains subcommands and flags.  
Use:


isa <command> --help
isa <command> <subcommand> --help


to explore details.

---

## 🌐 Global Flags

These flags are available on all commands:


--file <path>     Input file (Solidity, artifact, dataset)
--out <path>      Output file or directory
--json            Output machine-readable JSON
--verbose         Show detailed logs
--quiet           Suppress non-essential output


---

## 🧩 **Command Groups and Syntax**

### 🔷 SCE — Spec Compliance Engine

**Subcommands**  
`isa sce evaluate`

**Flags**  
`--file <path>`  
`--ruleset <name>`  
`--policy <article>`  
`--scenario <name>`  
`--json`

**Example**  

isa sce evaluate --file contract.sol --ruleset default --json


### 🔷 Inspect

**Flags**  
`--file <path>`  
`--json`

**Example**  

isa inspect --file artifact.json --json


### 🔷 Datasets

**Modes**  
`isa datasets --list`  
`isa datasets --stats`  
`isa datasets --scenario <name> --out <path>`

**Example**  

isa datasets --scenario baseline --out ./out/


### 🔷 Metrics

**Subcommands**  
`extract` | `score` | `layers`

**Flags**  
`--file <path>`  
`--metric <name>`  
`--threshold <value>`  
`--layer <name>`  
`--json`

**Example**  

isa metrics extract --file artifact.json --metric gas


### 🔷 Governance

**Subcommands**  
`evaluate` | `thresholds` | `simulate`

**Flags**  
`--file <path>`  
`--policy <article>`  
`--json`

**Example**  

isa governance evaluate --file artifact.json --policy A1


### 🔷 Tags (NatSpec++)

**Subcommands**  
`parse` | `extract` | `validate`

**Flags**  
`--file <path>`  
`--strict`  
`--layer <name>`  
`--json`

**Example**  

isa tags parse --file contract.sol --strict


### 🔷 Benchmark

**Subcommands**  
`run` | `compare` | `profile`

**Flags**  
`--file <path>`  
`--dataset <path>`  
`--scenario <name>`  
`--compare <file>`  
`--json`

**Example**  

isa benchmark run --file artifact.json --dataset ds.json


### 🔷 ISO

**Subcommands**  
`compute` | `align` | `report`

**Flags**  
`--file <path>`  
`--standard <iso>`  
`--out <path>`  
`--json`

**Example**  

isa iso compute --file artifact.json --standard ISO-27001


### 🔷 Security

**Subcommands**  
`map` | `score` | `report`

**Flags**  
`--file <path>`  
`--framework <CIS|MITRE|NIST|ISO>`  
`--out <path>`  
`--json`

**Example**  

isa security map --file artifact.json --framework CIS


### 🔷 Adversarial

**Subcommands**  
`simulate` | `vector` | `stress`

**Flags**  
`--file <path>`  
`--scenario <ddos|insider|supply-chain>`  
`--intensity <0-10>`  
`--json`

**Example**  

isa adversarial simulate --file artifact.json --scenario ddos --intensity 7


### 🔷 GCS — Golden Calibration Series

**Subcommands**  
`calibrate` | `verify`

**Flags**  
`--scenario <baseline|high-variance>`  
`--dataset <path>`  
`--json`

**Example**  

isa gcs calibrate --scenario baseline


### 🔷 Deploy

**Subcommands**  
`prepare` | `simulate` | `publish`

**Flags**  
`--file <path>`  
`--network <mainnet|testnet|local>`  
`--json`

**Example**  

isa deploy simulate --file artifact.json --network local


### 🔷 Forecast

**Subcommands**  
`theta` | `risk` | `simulate`

**Flags**  
`--dataset <path>`  
`--model <theta|risk>`  
`--json`

**Example**  

isa forecast simulate --dataset ds.json --model theta


---

# 🛠️ **Troubleshooting**

### **Hardhat Segmentation Fault**  
Occurs when Node is not installed inside WSL.  
Fix:


curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20.19.6


### **NatSpec++ Tag Errors**  
Hardhat requires custom tags to use:


@custom:<lowercase-hyphens>


Examples:


@custom:natspecpp
@custom:benchmark
@custom:governance


---

# 🤝 **Contributing**

We welcome contributions in:

- metrics  
- governance analysis  
- domain packs  
- schemas  
- CLI extensions  
- documentation  

Please see `docs/CONTRIBUTING.md` for full guidelines.

---

# 📄 **License**

Apache 2.0 — see `LICENSE`.

