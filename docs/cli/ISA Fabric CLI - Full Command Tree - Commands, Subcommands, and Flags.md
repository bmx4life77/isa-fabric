# ⚡ **ISA Fabric CLI — Full Command Tree (Commands, Subcommands, and --Flags)**  
*(v0.5.0 Governance Alpha)*

This is the **canonical CLI tree** as it stands today.  
You can drop this into:

```
docs/cli/cli-tree.md
```

or embed it into the main CLI README.

---

# 🧭 **Top‑Level Command Tree (ASCII)**

```
isa
├── governance
│   ├── evaluate
│   ├── simulate
│   └── inspect
│
├── benchmark
│   ├── run
│   └── compare
│
├── deploy
│   ├── simulate
│   ├── publish
│   └── inspect
│
├── tags
│   ├── parse
│   ├── extract
│   └── validate
│
├── iso
│   ├── compute
│   ├── map
│   └── report
│
├── security
│   ├── map
│   ├── evaluate
│   └── profile
│
├── adversarial
│   ├── simulate
│   ├── scenario
│   └── stress
│
└── gcs
    ├── calibrate
    ├── baseline
    └── inspect
```

---

# 🏛️ **1. Governance Command Group**

## **`isa governance evaluate`**
Evaluate a governance proposal or model.

**Usage:**
```
isa governance evaluate <proposal.json> [options]
```

**Flags:**
- `--format <pretty|json>` — output format  
- `--with-stress` — apply stress tests  
- `--axis <n>` — evaluate a specific axis  
- `--verbose` — detailed scoring breakdown  

---

## **`isa governance simulate`**
Run Monte Carlo simulations and stress propagation.

**Usage:**
```
isa governance simulate <proposal.json> [options]
```

**Flags:**
- `--iterations <N>` — number of simulation runs  
- `--seed <n>` — deterministic seed  
- `--stress-only` — run stress tests without lattice scoring  
- `--out <file>` — write simulation results to file  

---

## **`isa governance inspect`**
Inspect a governance envelope for structure and constitutional alignment.

**Usage:**
```
isa governance inspect <proposal.json> [options]
```

**Flags:**
- `--schema` — validate against envelope schema  
- `--constitution` — check Genesis Governance alignment  
- `--lattice` — check lattice completeness  
- `--json` — output raw inspection results  

---

# 📊 **2. Benchmark Command Group**

## **`isa benchmark run`**
Run lattice benchmarks on a dataset.

**Usage:**
```
isa benchmark run <dataset.json> [options]
```

**Flags:**
- `--with-stress`  
- `--format <pretty|json>`  
- `--model <name>`  

---

## **`isa benchmark compare`**
Compare governance models.

**Usage:**
```
isa benchmark compare <modelA> <modelB> [options]
```

**Flags:**
- `--axis <n>`  
- `--stress`  
- `--diff`  

---

# 🚀 **3. Deploy Command Group**

## **`isa deploy simulate`**
Simulate deployment of an artifact.

**Flags:**
- `--file <artifact.json>`  
- `--dry-run`  
- `--verbose`  

---

## **`isa deploy publish`**
Publish an artifact to a registry.

**Flags:**
- `--file <artifact.json>`  
- `--registry <url>`  
- `--force`  

---

## **`isa deploy inspect`**
Inspect deployment metadata.

**Flags:**
- `--file <artifact.json>`  
- `--json`  

---

# 🏷️ **4. Tags Command Group (NatSpec++)**

## **`isa tags parse`**
Parse NatSpec++ from Solidity.

**Flags:**
- `--file <contract.sol>`  
- `--strict`  

---

## **`isa tags extract`**
Extract canonical artifacts.

**Flags:**
- `--file <contract.sol>`  
- `--out <file>`  

---

## **`isa tags validate`**
Validate NatSpec++ annotations.

**Flags:**
- `--file <contract.sol>`  
- `--schema`  

---

# 🧩 **5. ISO Command Group**

## **`isa iso compute`**
Compute ISO alignment metrics.

**Flags:**
- `--file <artifact.json>`  
- `--standard <ISO-XXXX>`  

---

## **`isa iso map`**
Map artifact to ISO controls.

**Flags:**
- `--file <artifact.json>`  
- `--framework <name>`  

---

## **`isa iso report`**
Generate ISO compliance report.

**Flags:**
- `--file <artifact.json>`  
- `--format <md|json>`  

---

# 🔐 **6. Security Command Group**

## **`isa security map`**
Map to CIS/MITRE/NIST/ISO frameworks.

**Flags:**
- `--file <artifact.json>`  
- `--framework <name>`  

---

## **`isa security evaluate`**
Evaluate security posture.

**Flags:**
- `--file <artifact.json>`  
- `--profile <baseline|strict>`  

---

## **`isa security profile`**
Generate a security profile.

**Flags:**
- `--file <artifact.json>`  
- `--format <json|pretty>`  

---

# ⚔️ **7. Adversarial Command Group**

## **`isa adversarial simulate`**
Simulate adversarial scenarios.

**Flags:**
- `--scenario <name>`  
- `--file <proposal.json>`  

---

## **`isa adversarial scenario`**
List or inspect scenarios.

**Flags:**
- `--list`  
- `--describe <name>`  

---

## **`isa adversarial stress`**
Apply stress tests directly.

**Flags:**
- `--file <proposal.json>`  
- `--axis <n>`  

---

# 🧪 **8. GCS (Golden Calibration Series)**

## **`isa gcs calibrate`**
Run calibration routines.

**Flags:**
- `--scenario <name>`  
- `--file <artifact.json>`  

---

## **`isa gcs baseline`**
Generate baseline calibration.

**Flags:**
- `--file <artifact.json>`  

---

## **`isa gcs inspect`**
Inspect calibration metadata.

**Flags:**
- `--file <artifact.json>`  
- `--json`  
