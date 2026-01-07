## 3. NatSpec++ extraction schema (for CLI)

**Filename suggestion:** `docs/specs/natspec-extraction-schema.md`

This describes how the ISA CLI parses NatSpec++ annotations and maps them into structured data.

---

### 3.1 Supported NatSpec++ tags (ParallelDEX example)

From the contract:

```solidity
/// @natspec++ v0.2 beta:commit-ratio=0.87 semantic-layer=benchmarking confidence=0.95
/// @natspec++ v0.2 vu:parallelization-rate=0.73 semantic-layer=architecture
/// @natspec++ v0.2 iota:gas-ratio=0.82 semantic-layer=benchmarking
/// @natspec++ v0.2 phi:integration-coverage=0.92 semantic-layer=governance
/// @natspec++ v0.2 psi5:security-ratio=0.89 semantic-layer=security
/// @natspec++ v0.2 se:system-efficiency=85.3 semantic-layer=composite
/// @natspec++ v0.2 esi:efficiency-stability-index=87.1 semantic-layer=composite
/// @governance timelock=2days multisig=3of5 threshold=psi5:lt:0.3,se:gte:0.8
/// @benchmark suite=parallel-dex version=1.1.0 commit=abc123
```

---

### 3.2 Parsing schema (high‑level)

The CLI should parse NatSpec comments into a structure like:

```ts
type NatSpecMetricTag = {
  version: string;              // "v0.2"
  pillar: string;               // "beta", "vu", "iota", "phi", "psi5", "se", "esi"
  key: string;                  // "commit-ratio", "system-efficiency", etc.
  value: number;                // 0.87, 85.3, etc.
  semanticLayer: string;        // "benchmarking", "security", etc.
  confidence?: number;          // optional (e.g. 0.95)
};

type GovernanceAnnotation = {
  timelock?: string;            // "2days"
  multisig?: string;            // "3of5"
  threshold?: string;           // "psi5:lt:0.3,se:gte:0.8"
};

type BenchmarkAnnotation = {
  suite: string;
  version: string;
  commit: string;
};
```

---

### 3.3 Threshold parsing grammar

Example string:

```text
psi5:lt:0.3,se:gte:0.8
```

Parsed into:

```ts
type ThresholdPredicate = {
  metric: string;      // "psi5" or "se"
  op: "lt" | "lte" | "gt" | "gte" | "eq";
  value: number;       // 0.3 or 0.8
};

type ParsedThresholds = ThresholdPredicate[];
```

CLI behavior:

- parse thresholds,
- map metric names to on‑chain keys (`psi5` → `KEY_PSI5`),
- compare against `getMetric` / `getThreshold`,
- verify that on‑chain thresholds are consistent with annotated expectations.

---

### 3.4 Governance metadata extraction

From:

```solidity
/// @governance timelock=2days multisig=3of5 threshold=psi5:lt:0.3,se:gte:0.8
```

The CLI extracts:

```ts
{
  timelock: "2days",
  multisig: "3of5",
  threshold: "psi5:lt:0.3,se:gte:0.8"
}
```

Then cross‑checks:

- `timelock` vs `getGovernanceConfig().minDelay`
- `multisig` vs `multisigThreshold` and `multisigTotal`
- `threshold` vs `thresholds[KEY_PSI5_MAX]` and `thresholds[KEY_SE_MIN]` (after scaling/interpretation)

---

### 3.5 Benchmark metadata extraction

From:

```solidity
/// @benchmark suite=parallel-dex version=1.1.0 commit=abc123
```

The CLI extracts:

```ts
{
  suite: "parallel-dex",
  version: "1.1.0",
  commit: "abc123"
}
```

And aligns it with:

- `getBenchmarkMetadata()` return values,
- repository tags / commits,
- recorded benchmark runs.

---

### 3.6 CLI integration pattern

For a given contract:

1. Parse NatSpec++ from source / bytecode.  
2. Build structured annotations:
   - metrics,
   - governance,
   - benchmark.  
3. Call on‑chain hooks:
   - `getMetric`, `getThreshold`,
   - `getGovernanceConfig`,
   - `getBenchmarkMetadata`,
   - `getGovernanceHealth`.  
4. Cross‑check:
   - annotated vs live values,
   - thresholds vs enforcements,
   - benchmark metadata vs code version.  
5. Emit:
   - a JSON envelope with all this data,
   - suitable for ISA Fabric diagnostics.

