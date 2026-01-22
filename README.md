# ⭐ **ISA Fabric — README v0.3**  
*A modular research framework for structured metrics, semantic annotations, and pre‑on‑chain security analysis.*

DOI [(doi.org in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fdoi.org%2F10.5281%2Fzenodo.18168443")

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

```
.isa/deployments/
  envelopes/
  profiles/
  models/
  artifacts/
  active/
```

### **Modular CLI**  
A unified CLI for metrics, governance, datasets, adversarial analysis, ISO alignment, and more.

### **Cybersecurity Domain Pack**  
Prebuilt structures for CIS Controls v8, MITRE ATT&CK, NIST CSF, and more.

---

# 📁 **Project Structure**

```
isa-fabric/
├── src/                # Core TypeScript source
├── dist/               # Compiled output
├── docs/               # Extended documentation
├── data/               # Sample datasets
├── schemas/            # Zod schemas
├── contracts/          # Solidity contracts with NatSpec++
├── test/               # Mocha/Chai tests
└── .isa/deployments/   # Versioned artifacts
```

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
```
npm install --legacy-peer-deps
npm run build
```

### **Build Script**
Add this to `package.json` for WSL compatibility:

```
"build": "tsc -p tsconfig.json && cp -r src/schemas dist/schemas && chmod +x dist/cli/isaCli.js"
```

---

# 📟 **Command Line Interface (CLI)**  
*A unified interface for metrics, governance, datasets, adversarial analysis, and more.*

Run:

```
isa --help
```

---

## **Top‑Level Commands**

### **datasets**  
Generate and inspect ISA Fabric synthetic datasets.  
- `isa datasets generate <schema>`  
- `isa datasets inspect <file>`

### **iso**  
ISO alignment, compliance scoring, and maturity tier computation.  
- `isa iso score <file>`  
- `isa iso tier <file>`

### **benchmark**  
Run ISA Metrics benchmarking workflows.  
- `isa benchmark run <dataset>`  
- `isa benchmark summarize <results>`

### **tags**  
NatSpec++ tag extraction and generation.  
- `isa tags extract <contract>`  
- `isa tags generate <file>`

### **adversarial**  
Divergence analysis, attack‑vector simulation, and stress testing.  
- `isa adversarial simulate <scenario>`  
- `isa adversarial diff <A> <B>`

### **security**  
Security framework compatibility (CIS, MITRE, ISO, NIST).  
- `isa security map <dataset>`  
- `isa security score <dataset>`

### **gcs**  
Golden Calibration Series tools.  
- `isa gcs build`  
- `isa gcs inspect <file>`

### **inspect <file>**  
Inspect envelopes, profiles, models, or artifacts.

### **governance**  
Governance proposal analysis and pre‑on‑chain evaluation.  
- `isa governance run <proposal>`  
- `isa governance simulate <proposal>`  
- `isa governance explain <proposal>`  
- `isa governance diff <A> <B>`

### **metrics**  
Compute pillars, ψ‑family signals, envelopes, and regimes.  
- `isa metrics compute <dataset>`  
- `isa metrics envelope <dataset>`  
- `isa metrics regimes <dataset>`

### **deploy**  
Deploy artifacts to the local registry.  
- `isa deploy envelope <file>`  
- `isa deploy profile <file>`  
- `isa deploy model <file>`  
- `isa deploy list`

### **evaluate**  
Unified evaluation pipeline.  
- `isa evaluate run <proposal|dataset>`  
- `isa evaluate summary <results>`

### **forecast**  
Stability and drift forecasting.  
- `isa forecast run <dataset>`  
- `isa forecast compare <A> <B>`

---

# 🛠️ **Troubleshooting**

### **Hardhat Segmentation Fault**  
Occurs when Node is not installed inside WSL.  
Fix:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20.19.6
```

### **NatSpec++ Tag Errors**  
Hardhat requires custom tags to use:

```
@custom:<lowercase-hyphens>
```

Examples:

```
@custom:natspecpp
@custom:benchmark
@custom:governance
```

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
