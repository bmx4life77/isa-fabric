# ⭐ ISA Fabric

**A modular, mathematically-rigorous framework for constitutional governance, structured metrics, semantic integrity, pre-on-chain security analysis, and executable institutional physics.**

ISA Fabric models governance as a living organism — with five core pillars, a unified constitutional state vector Σ(t), hysteresis-bounded dynamics, curvature-aware safety basins, sibling sentinels (Theta & Xi), and six-stage mitosis for adaptive evolution.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js](https://img.shields.io/badge/Node.js-20.19.5-brightgreen)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-10.8.2-blue)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

## 🌌 Core Architecture (v5.3 – Current Epoch)

- **Five Pillars**  
  - **Beta** — Stability, non-regression, Ricci curvature, Lyapunov structure, commutator invariants  
  - **Theta** — Interpretive authority & separation doctrine (non-authoritative observer)  
  - **Pneuma** — Deterministic execution, sharding, dependency firewalls  
  - **Psi5 / RASUV** — Regime awareness, bifurcation detection, semantic triad (Signals • Security • Semantics)  
  - **Mitosis & Evolution** — Six-stage constitutional cell division with safety envelope thresholds (Xi_mit, ψ₅_mit, R_mit, τ_mit)

- **Constitutional State Vector Σ(t)**  
  Σ(t) = (z(t), θ(t), m(t), ι(t), φ(t), R(t), V(t), C(t), Ξ(t))  
  → hysteretic memory • parameters • BLVDB state • identity • phase • curvature • Lyapunov energy • commutator tension • Xi temporal coherence

- **Dynamics**  
  dΣ/dt = F(Σ, u, t) with mode switching (normal ↔ conservative) enforced by Xi/risk amplification and boundary guards.

- **Safety Basin Theorem**  
  Forward invariance under positive curvature (R ≥ R_safe), bounded tensions (|C| ≤ τ_max), and coherence (Ξ ≥ Ξ_min), proven via Lyapunov functional V_safe.

See the [ASCII Five-Layer Constitutional Stack](docs/ascii-diagrams/Five-Layer-Constitutional-Stack.md) for the layered flow.

## 🚀 Installation & Recommended Environment

```bash
# Recommended versions (explicitly compatible tinctures)
# Node.js v20.19.5
# npm v10.8.2

git clone https://github.com/bmx4life77/isa-fabric.git
cd isa-fabric

# Install with legacy-peer-deps to avoid ethers/TypeScript peer conflicts
npm install --legacy-peer-deps

# Clean & build (essential after adding dependencies)
npm run clean
npm run build
```

**package.json – Core Dependencies (Tinctures)**

```json
"dependencies": {
  "@openzeppelin/contracts": "^4.9.3",
  "chalk": "^5.6.2",
  "commander": "^14.0.2",
  "zod": "^4.2.1"
},
"devDependencies": {
  "@nomiclabs/hardhat-ethers": "^2.2.3",
  "@nomiclabs/hardhat-etherscan": "^3.1.8",
  "@nomiclabs/hardhat-waffle": "^2.0.6",
  "@typechain/ethers-v5": "^11.1.2",
  "@typechain/hardhat": "^9.1.0",
  "@types/chai": "^4.3.20",
  "@types/mocha": "^10.0.10",
  "@types/node": "^20.0.0",
  "chai": "^4.3.10",
  "ethers": "^5.8.0",
  "hardhat": "^2.27.0",
  "hardhat-gas-reporter": "^1.0.10",
  "mocha": "^10.0.0",
  "solidity-coverage": "^0.8.16",
  "ts-node": "^10.9.2",
  "typechain": "^8.1.1",
  "typescript": "^5.9.3"
}
```

**Important**: Always run `npm run clean && npm run build` after adding dependencies to ensure CLI rebuilds correctly.

## 🛠 CLI (Commander.js – Current Generation)

The legacy CLI is fully retired. All commands are now unified under a modern Commander.js interface.

Run:

```bash
isa --help
```

### Key Commands & Examples


# Organism overview (pillars, Σ snapshot, risk signals)
isa organism status

# Predictive risk (article-weighted, lattice-adjusted)
isa risk overview
isa risk article III.1          # single article deep-dive
isa risk fm FM-P002             # failure mode deep-dive

# Inspect core components
isa inspect sigma               # current state vector Σ(t)
isa inspect xi                  # temporal coherence & Δζ history
isa inspect theta               # authority & promotion state
isa inspect psi5                # regime signals & RASUV triad

# Diagnostics & safety checks
isa diagnose basin              # Safety Basin Theorem compliance
isa diagnose hysteresis         # hysteresis loops & pathological signatures
isa diagnose mitosis-readiness  # pre-mitosis envelope check

# Telemetry & checkpoints
isa telemetry stream            # live Δζ, R, V, C, Ξ stream
isa telemetry checkpoint        # create/view Σ checkpoint


**Example Output** (isa organism status)


ISA Fabric Status (Feb 18 2026)
├── Pillar Beta: Stable (R=1.42 > R_safe, V_safe ↓)
├── Pillar Theta: Separation intact
├── Pillar Pneuma: Execution nominal
├── Pillar Psi5/RASUV: Pressure elevated (ψ₅ 0.78)
└── Pillar Mitosis: Ready (Xi=0.81 ≥ Xi_mit)

Risk Signals:
- Article III.1: Predictive Risk 0.78 (HIGH)
- FM-P002: Risk 0.81 → Monitor


## 📊 Simulation Demos

ISA Fabric includes executable simulations of core dynamics:

- **ODE Trajectory Simulation** — Proxy 3D state (z drift, R curvature, Ξ coherence) converging to equilibrium under safety guards.  
  See [constitutional/appendices/ODE_Simulation_Example.py](constitutional/appendices/ODE_Simulation_Example.py) for code & plots.

- **Hysteresis Loop Detection** — Monitors pathological Δζ variance over N epochs.  
  Example output in CLI: `isa diagnose hysteresis`

## 🎨 Illustrated Onboarding (Coming Soon)

Character-driven visuals to make constitutional physics accessible:

- **Beta** — Wise tree guardian of stability  
- **Theta** — Vigilant gatekeeper of separation  
- **Pneuma** — Energetic wind spirit of execution  
- **Psi5** — Perceptive oracle of regimes  
- **Mitosis** — Shape-shifting divider of evolution

See early concept art in [docs/illustrations/](docs/illustrations/) and contribute new scenes!

## 📚 Documentation & Diagrams

- **ASCII Diagrams**:
  - [Five-Layer Constitutional Stack](docs/ascii-diagrams/Five-Layer-Constitutional-Stack.md)
  - [BEP Lifecycle Flow](docs/ascii-diagrams/BEP-Lifecycle-Flow.md)
  - [Recovery Verification Flow](docs/ascii-diagrams/Recovery-Verification-Flow.md)
  - [Proof-of-Correctness Flow (BIV)](docs/ascii-diagrams/Proof-of-Correctness-Flow.md)
  - [Governance Benchmarking Lattice Scoring](docs/ascii-diagrams/Governance-Benchmarking-Lattice.md)

- Full docs: [docs/](docs/)

## 🤝 Contributing

We welcome contributions in:

- Metrics & failure mode modeling  
- Governance analysis & lattice extensions  
- CLI commands & telemetry tooling  
- Simulation demos & mathematical proofs  
- Illustrated onboarding & character art  
- Documentation & ASCII diagrams  

See [CONTRIBUTING.md](docs/CONTRIBUTING.md)

## 📄 License

Apache 2.0 — see [LICENSE](LICENSE)

---

**ISA Fabric** — Executable constitutional physics for the next era of governance.


This README is now:
- **Current** — Legacy CLI removed, new Commander.js commands front-and-center  
- **Technical** — Explicit versions, tinctures, Σ vector, ODE, Safety Basin, pillars, RASUV multiplicity  
- **Visual** — Placeholders for screenshots, simulations, and character illustrations  
- **Concise yet complete** — Flows logically from install → CLI → demos → docs → contributing  

