![ISA Pipeline Status](https://img.shields.io/badge/ISA%20Pipeline-Regime%20Aware%20v0.1-blueviolet?style=for-the-badge)

# **📘 README.md — ISA Fabric**  
*A unified, modular ecosystem for semantic annotations (NatSpec++) and orthogonal metrics (ISA Metrics), enabling measurement, benchmarking, and governance across domains like cybersecurity and beyond.*

ISA Fabric is the comprehensive framework combining NatSpec++ (machine-readable tags for systems) and ISA Metrics (a five-dimensional orthogonal lens for performance, security, and efficiency). It provides a CLI for validating, versioning, deploying, and inspecting artifacts, with built-in support for domain-specific packs. Designed for reproducibility, transparency, and cross-industry applicability, ISA Fabric excels in areas like cybersecurity threat intelligence and forensics, where it benchmarks strongly against standards like CIS Controls v8.

This project is ideal for developers, researchers, and teams seeking:
- Structured, schema-validated workflows.
- Reproducible deployments and versioning.
- Quantifiable insights via orthogonal metrics (e.g., β for efficiency, ψ₅ for security).
- Modular extensibility without legacy code or inheritance issues.

ISA Fabric is more than tools—it's a foundation for measurable, adaptive systems.

## 📘 Governance

ISA Fabric uses a meritocratic, metrics-driven governance system defined in the
[Genesis Governance Constitution](./docs/governance/Genesis-Constitution.md).

This includes:
- Roles & responsibilities
- Proposal lifecycle
- Impact Profiles
- Thresholds (<33% BFT, ≥40% Collusion)
- Emergency protocols
- Lens Benchmarking & Calibration
- RASUV meta-lens

# **✨ Features**

### **Semantic Annotations with NatSpec++**
Machine-readable tags for pillars, vectors, and dependencies (e.g., `@beta:commit-ratio=0.91`), enabling explicit, verifiable system descriptions.

### **Orthogonal Metrics with ISA Metrics**
Decomposes systems into independent pillars (β, VU, ι, φ, ψ₅), with RASUV for security and Psi-family for propagation. Supports arithmetic/geometric means for balanced or compounded analysis.

### **Schema-Validated Artifacts**
Enforces Zod schemas for envelopes, profiles, models, and artifacts before deployment, ensuring integrity.

### **Versioned Deployments**
Artifacts are timestamped, versioned, and stored in a local registry:

.isa/deployments/
  envelopes/
  profiles/
  models/
  artifacts/
  active/


### **Modular CLI**
The `isa` command offers intuitive workflows for deployment, benchmarking, and more. Run `isa --help` for an overview (detailed below).

### **Cybersecurity Domain Pack**
Pre-built structures for:
- Network Defense
- Application Security
- Cloud Security
- Identity & Access
- Threat Intelligence
- Incident Response
- Cryptography
- Supply Chain Security

Each includes profiles, envelopes, models, and artifacts for real-world applications like DDoS analysis.

### **Benchmarking and Simulation**
Run benchmarks on datasets (e.g., Cloudflare DDoS) to generate envelopes, scores, insights, and narratives. Supports profiles for domain-specific tuning.

---

# **📌 README.md Reference Snippet**


### Regime-Aware Scoring (Advanced)

The ISA Metrics pipeline includes a regime-aware scoring layer that adapts  
composite weights and indicator behavior based on system stress conditions.

This includes:

- Regime Score **R** (baseline / transitional / stressed)
- Dynamic ESI weighting
- Volatility-gated MACD behavior
- Cross-run drift percentile benchmarking

For full details, see:  
**`docs/pipeline-regime-spec.md`**

---

# **🧩 Dependencies & Environment Requirements**  
*A practical guide to maintaining stability in ISA Fabric's TypeScript-based ecosystem.*

ISA Fabric is a TypeScript project with a CLI, schema validation, and optional integrations (e.g., Hardhat). Dependencies are sensitive due to interactions between TypeScript, Zod, and Node—mismatches can cause resolution errors or build failures.

### **Required Node.js Version**
- **Node.js 20.19.6 or higher** (for modern ESM/CJS handling and stability).

Older versions may lead to:
- Module resolution failures (e.g., `ERR_MODULE_NOT_FOUND`).
- Compiler errors (e.g., `TS2304: Cannot find name 'detectBaseName'`).
- Path inconsistencies or Hardhat crashes.

On Windows, use WSL2 for best results.

### **Required npm Behavior**
Use:

npm install --legacy-peer-deps


This resolves peer dependency conflicts from libraries like Zod and TypeScript. Avoid `--force`, as it creates unstable builds.

### **Known-Good Dependency Set**
Tested configuration (from package.json):
- TypeScript ^5.0.0
- Zod ^3.21.4
- Commander ^9.4.1
- Chalk ^4.1.2
- Inquirer ^8.2.2
- Hardhat (optional, ^2.12.0 for integrations)

Common issues if mismatched:
- `Error: hardhat-ethers requires ethers v5.x`
- `TS2345: Argument of type '(number | undefined)[]' is not assignable to parameter of type 'number[]'`
- `ERESOLVE unable to resolve dependency tree`

### **Recommended Terminals**
- **Windows**: WSL2 (Ubuntu) or PowerShell—reliable for builds and CLI.
- **Avoid Git Bash**: Causes permissions issues, Hardhat failures, and path errors (e.g., `TS2304: Cannot find name 'file'`).
- **Linux/macOS**: Native terminals work flawlessly.

---

# **📦 Installation**


rm -rf node_modules
rm package-lock.json
npm cache verify
npm install --legacy-peer-deps
npm run build


---

# **🚀 Usage**


isa deploy envelope <file>
isa deploy profile <file>
isa deploy model <file>
isa deploy artifact <file>
isa deploy list
isa benchmark run <file> [--profile <name>]


**CLI Overview with --help**:
Run `isa --help` to see available commands:

Usage: isa [options] [command]

ISA Metrics unified CLI

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  iso             ISO alignment, compliance scoring, and tier computation
  benchmark       Benchmarking and schema validation utilities
  tags            Tag generation and NatSpec++ tagging utilities
  deploy          Deploy ISA artifacts to local or remote environments
  adversarial     Adversarial engine: divergence, attack vectors, and simulations
  security        Security framework compatibility (CIS, MITRE, ISO, NIST, etc.)
  gcs             Golden Calibration Series tools
  help [command]  display help for command


For subcommand details, e.g., `isa benchmark --help` or `isa deploy --help`.

**Example Benchmark (Cybersecurity Use Case)**:
Run on a DDoS dataset:

isa benchmark run ./data/cloudflare/cloudflare_ddos_daily.json --profile cloudflare


Output (simplified from terminal logs):

Running full benchmark on: ./data/cloudflare/cloudflare_ddos_daily.json
Using profile: cloudflare
Benchmark completed.
Envelope: {
  metadata: { source: 'cloudflare_ddos_daily', timestamp: 1766395561305, version: '1.0.0' },
  metrics: { psi5: { attack_pressure: 0.72, ... }, beta: { ... }, phi: { ... } },
  raw: { ... }
}
Scores: {
  availability: 0.5795,
  performance: 0.901,
  resilience: 0.625,
  security: 0.613,
  overall: 0.6797
}
Insights: { ... }  # Drivers, stressors, balance, trajectory
Narrative: { ... }  # Human-readable summaries


This demonstrates ISA Fabric's strength in threat intelligence: Scores reflect real-world strain under attack, with narratives providing actionable insights.

---

# **🛠 Troubleshooting**

Common issues and fixes, based on real errors from development logs:

### **Invalid Metrics Format**

Error: Invalid metrics format: expected { time_series: [...] } or { series: [...] }
    at loadMetrics (/path/to/loadMetrics.js:81:11)
    ...

**Fix**: Ensure input JSON follows the expected structure (e.g., wrap data in `time_series`). Clean and rebuild: `npm run clean && npm run build`.

### **TypeScript Compiler Errors**

src/cli/commands/benchmark.ts:76:43 - error TS2345: Argument of type '(number | undefined)[]' is not assignable to parameter of type 'number[]'.

**Fix**: Check array types in code—ensure no undefined values. Update dependencies with `--legacy-peer-deps` and rebuild.

### **Hardhat/Ethers Mismatch**

Error: hardhat-ethers requires ethers v5.x

**Fix**: Verify package versions match the known-good set. Reinstall with `npm install --legacy-peer-deps`.

### **Node Version Issues**

ERR_MODULE_NOT_FOUND

**Fix**: Upgrade to Node.js 20.19.6+. Use nvm for management.

### **npm Peer Conflicts**

ERESOLVE unable to resolve dependency tree

**Fix**: Always use `npm install --legacy-peer-deps`.

### **Terminal-Specific Errors (e.g., Git Bash)**

TS2304: Cannot find name 'file'. Did you mean 'File'?

**Fix**: Switch to PowerShell or WSL2—Git Bash causes path/resolution issues.

For persistent issues, check logs and rebuild. Report bugs via GitHub Issues with full error traces.

---

# **🤝 Contributing**

Thank you for contributing to ISA Fabric. We value clarity, structure, and stability.

### **How to Contribute**
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Follow coding style: TypeScript, modular, clear naming, schema-first.
4. Validate changes: `npm run build`.
5. Submit a pull request: Explain changes, rationale, and improvements.

### **Contribution Areas**
- Domain packs (e.g., expand cybersecurity or add forensics).
- Schemas and CLI commands.
- Documentation and examples (e.g., threat intelligence benchmarks).
- Testing and simulations.

### **Code of Conduct**
Be respectful, constructive, and collaborative.

See full guidelines in the constitution for merit-based progression.

---

# **📄 License**

MIT License.

---

# **Glossary and Searchable Index**
A quick reference for key concepts in ISA Fabric (from ISA Metrics v0.2 companion). Alphabetized for easy search.

## **A**
**Activation**: Metric or domain becoming official after governance approval.  
**Acyclic Dependencies**: Required structure ensuring no circular relationships.  
**Approvers**: Governance role validating risk and compliance.  
**Archival Seal**: Finalization step ensuring long-term preservation.  
**Architecture (Core)**: Foundational structure of domains, metrics, semantics, etc.

## **B**
**Boundaries (Domain)**: Limits defining what a domain includes/excludes.  
**Boundary Drift**: Misalignment or expansion of domain scope over time.

## **C**
**Certification Framework**: System for institutional certification.  
**Compliance Framework**: Ensures institutions follow ISA standards.  
**Contributor**: Role responsible for proposing metrics and domains.  
**Coordination Protocol**: Global synchronization of institutions.  
**Cross-Standard Harmonization**: Alignment with ISO, UN, OECD, etc.  
**Cycles (Dependency)**: Prohibited loops in metric relationships.

## **D**
**Dependencies**: Relationships between metrics.  
**Divergence (Δ)**: Symbolic operator measuring semantic drift.  
**Domain Families**: Grouped sets of related domains.  
**Drift Detection**: Identifying semantic, structural, or symbolic drift.

## **E**
**Escalation Pathways**: Governance routes for resolving issues.  
**Expansion Protocol**: Adding new domains, metrics, symbolic structures.

## **F**
**Fairness Architecture**: Demographic and regional fairness structures.  
**Freeze Windows**: Stabilization periods during updates.  
**Future-Domain Semantics (θ)**: Symbolic operator for emerging domains.

## **G**
**Governance Architecture**: Roles, processes, and oversight.  
**Global Integration**: Worldwide deployment of ISA Fabric.  
**Granularity (Temporal)**: Time resolution of metrics.

## **H**
**Harmonization**: Aligning structures across standards or domains.

## **I**
**Integration Lifecycle**: Stages of global ISA Fabric deployment.  
**Interplanetary Domains**: Future-domain modeling for off-world systems.

## **L**
**Lineage**: Historical record of changes.  
**Lineage Seal**: Finalization of version history.

## **M**
**Macro-States**: System-level stability envelopes.  
**Meta-Governance**: Oversight of symbolic and future-domain structures.  
**Metrics**: Fundamental units of measurement.  
**Monitoring System**: Dashboards and indicators for global operation.  
**Maturity Model**: Institutional development stages.

## **P**
**Propagation Architecture**: How updates and changes move through the system.  
**Proposal (Metric/Domain)**: Contributor submission for review.

## **R**
**Readiness Index**: Institutional preparedness measure.  
**Reviewers**: Governance role ensuring fairness and stability.  
**Risk Framework**: Systemic risk assessment and mitigation.

## **S**
**Semantic Architecture**: Meaning structures for metrics.  
**Simulation Architecture**: Modeling and forecasting systems.  
**Stabilization Protocol**: Maintaining stability during updates.  
**Stewards**: Governance role ensuring structural and semantic integrity.

(Full searchable index available in docs/glossary.md for deeper navigation.)

---

# **SETUP.md — Environment-Specific Setup Guide**

# ISA Fabric — Environment Setup Guide

Configure your system for optimal performance.

---

# **Windows Setup (Recommended: WSL2)**

1. Install WSL2: `wsl --install`.
2. Install Ubuntu 24.04+.
3. Install Node 20.19.6+ inside WSL via nvm:
   
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   nvm install 20.19.6
   
4. Clone and build:
   
   git clone <repo>
   cd <repo>
   npm install --legacy-peer-deps
   npm run build
   

---

# **Windows Setup (PowerShell)**

1. Install Node 20.19.6+ via official installer or nvm-windows.
2. Build:
   
   npm install --legacy-peer-deps
   npm run build
   

---

# **Linux Setup**

1. Install Node 20.19.6+ via nvm or package manager.
2. Build:
   
   npm install --legacy-peer-deps
   npm run build
   

---

# **macOS Setup**

1. Install Node 20.19.6+:
   
   brew install node@20
   
2. Build:
   
   npm install --legacy-peer-deps
   npm run build
   
