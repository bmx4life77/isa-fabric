
## 2. ISA Fabric integration spec (ParallelDEX)

**Filename suggestion:** `docs/specs/isa-fabric-integration-parallel-dex.md`

### 2.1 Role of ParallelDEX in ISA Fabric

ParallelDEX acts as a **governance‑aware DEX endpoint** that:

- emits and consumes metrics relevant to ISA Metrics (ψ₅, SE),
- exposes governance state for diagnostics,
- implements metric‑based thresholds in live execution,
- can be benchmarked and monitored as part of ISA Fabric’s regime analysis.

---

### 2.2 Metrics integration

**On‑chain metrics state:**

- `metrics[KEY_PSI5]` → ψ₅ (security ratio, scaled by 1000).  
- `metrics[KEY_SE]` → SE (system efficiency, scaled by 1000).  

**Thresholds:**

- `thresholds[KEY_PSI5_MAX]` → ψ₅ upper bound.  
- `thresholds[KEY_SE_MIN]` → SE lower bound.  

**ISA Fabric access:**

- `getMetric(bytes32 key)`  
- `getThreshold(bytes32 key)`  
- `getGovernanceHealth()`  

These functions allow ISA Fabric to:

- pull live ψ₅/SE values,
- compare against its own envelope or baseline,
- classify regimes or flag stress.

---

### 2.3 Governance health and regimes

`getGovernanceHealth()` returns:

- ψ₅, SE,
- ψ₅_max, SE_min,
- `psi5Ok`, `seOk`,
- `isPaused`,
- `minDelay`.

ISA Fabric can:

- convert these into an **R score** or regime label,
- map them onto the ψ‑family and composite metrics,
- detect when the DEX governance is under stress (e.g., repeated threshold breaches, frequent pauses, high ψ₅).

---

### 2.4 Governance events and Fabric diagnostics

Events to monitor:

- `MetricUpdated`
- `ThresholdUpdated`
- `DexRouterUpdated`
- `Paused` / `Unpaused`
- `ProposalCreated`
- `ProposalScheduled`
- `ProposalExecuted`

ISA Fabric can:

- ingest these as a time series,
- correlate governance actions with metric changes,
- detect anomalies (e.g., repeated threshold downgrades, frequent pausing, inconsistent updates).

---

### 2.5 Benchmark integration

`getBenchmarkMetadata()` returns:

- `suite = "parallel-dex"`
- `version = "1.1.0"`
- `commit = "abc123"`

ISA Fabric can:

- tag benchmark runs with these values,
- ensure reproducibility,
- distinguish between versions when comparing results.
