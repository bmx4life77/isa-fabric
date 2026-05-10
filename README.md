# ISA Fabric — Constitutional Compute for AI Alignment

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node-20.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Lean 4](https://img.shields.io/badge/Lean_4-Verified-purple)

**A governance engine that detects, interprets, and corrects alignment drift in complex AI systems.**

ISA Fabric treats governance as **computational physics**: it models societal propagation, enforces lattice invariants, repairs governance geometry in real time, and maintains replay-verifiable constitutional integrity.

---

## Why ISA Fabric?

AI systems drift. Without strong, verifiable guardrails, even well-intentioned models slowly diverge from human values, safety boundaries, and intended behavior.

**ISA Fabric** provides:
- Early detection of alignment drift across technical, societal, and ethical dimensions
- Dynamic governance-space repair (JGES)
- Replay-verifiable execution
- Formal verification pathways (Lean 4)
- Constitutional-grade safety boundaries (PCSF + MPAB)

---

## Architecture Overview

flowchart TD
    A[External Events] --> B[AnimaDB - Event Log]
    B --> C[Σ(t) - Unified Constitutional State]
    C --> D[Σ_society(t) - 72-Domain Propagation Tensor]
    D --> E[BLA - Base Lattice Architecture]
    E --> F[JGES - Junction Governance Engine]
    F --> G[PCSF - Pre-Commutative Serialization Field]
    G --> H[MPAB - Multi-Point Access Bridge]
    H --> I[CLI • Lean 4 • External Systems]
    I --> C
    style C fill:#e3f2fd
    style D fill:#f3e5f5
    style F fill:#e8f5e9
    style G fill:#fff3e0
     

### Core Components

- **Σ_society(t)** — 72×72×5 influence tensor modeling propagation across economic, social, technological, ethical, and other domains

- **BLA** — Static lattice of constitutional invariants and ψ-family decomposition
  
- **JGES** — Dynamic governance-space interpreter and repair engine
  
- **PCSF** — Canonical "airlock" that normalizes and validates state before bridging
  
- **MPAB** — Safe dual-handshake routing protocol between modules

---

## CLI Commands


isa society          # Run societal simulation + terminal heatmap

isa replay           # Replay transitions with JGES repair

isa status           # Overall governance & system health

isa metrics          # Constitutional metrics (ψ5, SE, divergence)


isa regime           # Current governance regime (M-I, etc.)
isa envelopes        # Envelope classification & testing

isa semantics        # Semantic intent analysis

isa simulate         # Run simulation steps

isa proof-bundle     # Generate verifiable proof bundles


*(Full command reference available via `isa --help`)*

---

## Getting Started

git clone <your-repo-url>

cd natspecpp-fabric

npm install

npm run build

**Quick Demo**

# Societal propagation with heatmap

isa society

# Replay historical transitions with governance repair

isa replay

# Current system status

isa status


---

## Philosophy — Constitutional Compute

We believe **alignment is not a training problem — it is a constitutional one**.

ISA Fabric treats governance as a **computable physical system**: energy (V), ambiguity (ξ), curvature, and societal influence propagate under formal invariants. Drift is not hidden — it is measured, repaired, and made verifiable.

This is **compute that remembers its constitution**.

---

## Screenshots

**Native TypeScript CLI** — `isa society` (terminal heatmap):

~/natspecpp-fabric$ isa
ISA Fabric CLI — v6 Command Reference
=====================================

Core Commands:

  status *       Show high-level ISA Fabric v6 status
  
  metrics *      Show constitutional metrics (ψ5, SE, κ_align)
  
  regime *      Show current governance regime
  
  envelopes *    Show P/S/E envelope classification
  
  semantics *    Show semantic intent + replay plan
  
  simulate *     Run one or more Σ(t) ticks
  
  society *      Societal pulse + simulation

Corpus Commands:

  pillars *       Show doctrinal families + articles
  
  article *      Show a specific constitutional article

  replay *        Show replay plan bundles
  
  proof-bundle *  Show proof bundle for a doctrine
  
  hge-trace *     Trace hysteron transitions

Diagnostic Commands:

  hge-trace     Trace hysteron transitions
  
  op-exec       Execute a NatSpec++ operator (dev)

Use: isa <command> [options]


kidcrypto@DESKTOP-QDKGKFK:~/natspecpp-fabric$ isa metrics

{
  "anima": {
    "totalTransitions": 19,
    "timeWindowSeconds": 368054.642,
    "transitionsPerSecond": 0.000051622769642992304,
    "semanticDensity": 0.7368421052631579,
    "firstTimestamp": 1778022821164,
    "lastTimestamp": 1778390875806,
    "topOperators": [
      [
        "unknown",
        19
      ]
    ],
    "topHysterons": []
  },
  "governance": {
    "vertex": "v_0_2_2",
    "region": "M",
    "family": "I",
    "curvature": "C2",
    "divergenceClass": "YELLOW",
    "correctiveOperator": "ADJUST"
  }
}

kidcrypto@DESKTOP-QDKGKFK:~/natspecpp-fabric$ isa replay

Replaying 24 transitions...

[Σ(t)-replay] ts=1778022821164 hysteron=- operator=unknown transition={"type":"hysteron_transition","timestamp":1778022821164,"operator":"adjust","transition":{"hysteron_id":"stability_hysteron","action":"activate","input":0.82},"metadata":{"semantics":{"drift":0.42,"norm":0.33,"behavior":0.21,"tension":0.55,"activation":"stability","tags":["governance","activation"]}}}
[JGES] Unified projection: no JGES vertices, using base=v_0_2_2
[JGES] Trap check: {
  prevV: '0.000',
  nextV: '0.000',
  dV: '0.000',
  prevXi: '0.800',
  nextXi: '0.800',
  dXi: '0.000',
  validTransition: true
}
[JGES] Trap eval: {
  dV: '0.0000',
  dXi: '0.0000',
  isFlat: true,
  isTrueTrap: false,
  validTransition: true
}

kidcrypto@DESKTOP-QDKGKFK:~/natspecpp-fabric$ isa society pulse
Loaded tensor from /home/kidcrypto/natspecpp-fabric/dist/cli/v6/society/tensor.json

🌐 Societal Pulse (Σ_society)
================================================================================

📁 Economic
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.69 0.70 0.70 0.70 0.70 0.69

📁 Social
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

📁 Technological
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

📁 Environmental
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.69 0.69 0.70 0.70 0.70 0.70 0.70 0.70

📁 Political
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

📁 Cultural
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

📁 Scientific
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

📁 Ethical
 🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠    🟠
   0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70 0.70

================================================================================

**Lean 4 CLI** — Formal verification & state tracing:

kidcrypto@DESKTOP-QDKGKFK:~/natspecpp-fabric/ISA-Fabric/lean$ FABRIC_ARGS="fabric trace 5" ./.lake/build/bin/isa_fabric

Tracing state S=5:

 V(Σ) = 5
 
 After dec1 = 4
 
 ξ = #[0, 0, 0, 0, 0]
 
 Dominant : I: Productive Duality
 
 Envelope : Moderate (P1)
 
 Safe Basin : false
 
 Integrity Score : 5
 
kidcrypto@DESKTOP-QDKGKFK:~/natspecpp-fabric/ISA-Fabric/lean$ FABRIC_ARGS="fabric run 5 --steps 3" ./.lake/build/bin/isa_fabric

S=5 V=5 ξ=#[0, 0, 0, 0, 0] Dom=I: Productive Duality Env=Moderate (P1) Safe=false

S=4 V=4 ξ=#[1, 0, 0, 0, 0] Dom=I: Productive Duality Env=Safe (P0/S0/E0) Safe=true

S=3 V=3 ξ=#[2, 0, 0, 0, 0] Dom=I: Productive Duality Env=Safe (P0/S0/E0) Safe=true

---

## Repository Structure (Key Areas)

- `src/cli/v6/` — Main runtime and commands
- `src/cli/v6/society/` — Σ_society(t) tensor engine + visualization
- `src/cli/v6/runtime/jges/` — Governance repair engine
- `src/cli/v6/runtime/pcsf/` — Pre-Commutative Serialization Field
- `src/cli/v6/runtime/mpab/` — Multi-Point Access Bridge
- `src/blvdb/` — Event log & replay system
- `lean/` — Formal verification layer (Lean 4)

---

## Changelog Highlights

**v6.2 (2026-05-10)**
- Added **PCSF** and **MPAB** formal safety layers
- Strengthened JGES with richer embeddings and Delta Zeta mutation
- Improved cross-module propagation safety

**v6.1**
- Full 72-domain Σ_society(t) engine + terminal heatmap

---

## License

Apache 2.0

---

**Built with curiosity, rigor, and constitutional intent.**
