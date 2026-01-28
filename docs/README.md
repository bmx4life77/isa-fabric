# ⚡ ISA Fabric CLI — README (v0.5.0 Governance Alpha)

The **ISA Fabric CLI** is the unified command-line interface for the ISA Fabric ecosystem — a modular research framework for semantic contract analysis, governance-aware computation, metrics benchmarking, and constitutional resilience evaluation.

This version focuses on the **Governance Alpha** release, with deep integration into:

- Genesis Governance v4.0  
- Governance Benchmarking Lattice v1.0  
- Stress Testing Framework  
- NatSpec++ semantic layer  
- Canonical artifact pipeline  

---

## 📋 Quick Start

### Install (Development)
```bash
git clone https://github.com/bmx4life77/isa-fabric.git
cd isa-fabric
npm install --legacy-peer-deps
npm run build
npm link
```

### Verify
```bash
isa --help
```

You should see the full command tree.

---

## 🧭 CLI Structure Overview

The CLI uses a clean, hierarchical design:

```
isa
├── governance          # Core governance evaluation & simulation (Alpha focus)
├── benchmark           # Metrics & lattice benchmarking
├── deploy              # Artifact deployment & registry tools
├── tags                # NatSpec++ parsing, extraction, validation
├── iso                 # ISO alignment & compliance reporting
├── security            # Framework mapping (CIS, MITRE, NIST, ISO)
├── adversarial         # Attack vector & stress simulations
└── gcs                 # Golden Calibration Series utilities
```

### Visual Command Hierarchy (ASCII)

```
isa
├── governance
│   ├── evaluate        # Score proposal/model against lattice
│   ├── simulate        # Monte Carlo + stress propagation
│   └── inspect         # Schema & constitutional validation
├── benchmark
├── deploy
├── tags
├── iso
├── security
├── adversarial
└── gcs
```

---

## 🚀 Core Command Groups

### 1. Governance (Primary Focus – Alpha)

The governance group is the heart of v0.5.0. It integrates directly with the Governance Benchmarking Lattice, stress modifiers, and Genesis Governance v4.0.

#### Commands

- **evaluate**  
  ```bash
  isa governance evaluate <proposal.json> [--format pretty|json] [--with-stress]
  ```
  - Loads proposal envelope  
  - Validates schema  
  - Scores against 10-axis lattice  
  - Applies stress tests (optional)  
  - Outputs resilience report

- **simulate**  
  ```bash
  isa governance simulate <proposal.json> [--iterations N]
  ```
  - Runs Monte Carlo drift simulation  
  - Propagates stress modifiers  
  - Models resilience envelope

- **inspect**  
  ```bash
  isa governance inspect <proposal.json>
  ```
  - Validates schema & constitutional references  
  - Detects missing fields  
  - Flags governance risks

#### Governance Engine Flow (ASCII)

```
Solidity + NatSpec++ ─► Canonical Artifact
                          │
                          ▼
                   Governance Envelope (.json)
                          │
               ┌──────────┴──────────┐
               ▼                     ▼
       isa governance evaluate   isa governance simulate
               │                     │
               ▼                     ▼
   Lattice Scoring (10 axes)   Monte Carlo + Stress Modifiers
               │                     │
               ▼                     ▼
         Resilience Report     Resilience Envelope Model
```

---

### 2. Other Key Groups (Brief)

| Command      | Purpose                                      | Example Command                                   |
|--------------|----------------------------------------------|---------------------------------------------------|
| `benchmark`  | Run lattice benchmarks & compare models      | `isa benchmark run <dataset.json>`                |
| `deploy`     | Prepare, simulate, publish artifacts         | `isa deploy simulate --file artifact.json`        |
| `tags`       | Parse, extract, validate NatSpec++           | `isa tags parse --file contract.sol --strict`     |
| `iso`        | ISO compliance alignment & reporting         | `isa iso compute --file artifact.json`            |
| `security`   | Map to CIS/MITRE/NIST/ISO frameworks         | `isa security map --file artifact.json --framework NIST` |
| `adversarial`| Simulate attack vectors & stress             | `isa adversarial simulate --scenario ddos`        |
| `gcs`        | Golden Calibration Series tools              | `isa gcs calibrate --scenario baseline`           |

Run `isa <command> --help` or `isa <command> <subcommand> --help` for detailed flags.

---

## 🛠️ Extending the CLI

### Add a New Command Group

1. Create folder:  
   `src/cli/commands/<newgroup>/`

2. Add entry file (`index.ts`):
   ```ts
   import { Command } from 'commander';

   export default function register(program: Command) {
     program
       .command('newgroup')
       .description('New command group description')
       .command('run')
       .description('Run the new command')
       .action(() => {
         console.log('New command executed!');
       });
   }
   ```

3. Register in `src/cli/index.ts`:
   ```ts
   import newgroup from './commands/newgroup';
   newgroup(program);
   ```

4. Rebuild:
   ```bash
   npm run build
   ```

---

## 📂 Governance Engine Integration

The governance engine lives in:

```
src/governance/
├── evaluator.ts       # Lattice scoring & stress application
├── simulator.ts       # Monte Carlo & envelope modeling
├── inspector.ts       # Schema & constitutional validation
└── types.ts           # Proposal envelope, lattice types
```

### Integration Flow (ASCII)

```
Proposal JSON
     │
     ▼
┌──────────────────────┐
│   Governance Engine  │
│                      │
│  evaluator.ts ─────► Lattice Scoring
│  simulator.ts ─────► Monte Carlo + Stress
│  inspector.ts ─────► Schema & Risk Check
└───────────┬──────────┘
            │
            ▼
     Resilience Report
   (JSON / Pretty / Envelope)
```

---

## 🔧 Build & Distribution

### Build
```bash
npm run build
```

### Global Link (Development)
```bash
npm link
```

### Future Packaging
Once Governance Alpha reaches beta, plan to publish as:
```bash
npm publish isa-fabric
```

---

## 🛤️ Roadmap (v0.5.0 → v1.0)

- [x] Governance Alpha CLI skeleton  
- [x] Lattice v1.0 integration  
- [ ] Full stress modifier application  
- [ ] Pretty-printed resilience reports  
- [ ] Proposal diffing & drift detection  
- [ ] Resilience envelope visualization (ASCII + future SVG)  
- [ ] Automated benchmark comparison across models  
- [ ] Governance Safety Pack v1 reference implementation  

---

## 📄 License

Apache 2.0

ISA Fabric © 2026 — All rights reserved.

See `LICENSE` for full terms.
