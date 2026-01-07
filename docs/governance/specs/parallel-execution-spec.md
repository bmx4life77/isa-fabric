
## 1. Off‑chain parallel execution spec (ParallelDEX)

**Filename suggestion:** `docs/specs/parallel-execution-spec.md`

### 1.1 Overview

ParallelDEX implements a batch‑based swap executor that is optimized for off‑chain parallel processing and on‑chain deterministic settlement.

- **Off‑chain:** orders are simulated, validated, and routed in parallel.  
- **On‑chain:** a finalized batch is executed sequentially in a single transaction via `executeParallelBatch`.

This design enables optimistic parallelism while preserving EVM determinism and governance enforcement.

---

### 1.2 Order model

Each order is represented as:

```solidity
struct Order {
    address tokenIn;
    address tokenOut;
    uint256 amountIn;
    uint256 minAmountOut;
    uint256 deadline;
}
```

**Off‑chain properties:**

- Orders are **independent**: no shared mutable state across orders.
- Off‑chain engines can:
  - simulate swaps,
  - check slippage,
  - route paths,
  - reject invalid orders before submission.

**On‑chain constraints:**

- `deadline` must be ≥ `block.timestamp`.
- `amountIn` and `minAmountOut` must be valid for the router.
- Batch size: `1 <= orders.length <= 10`.

---

### 1.3 Off‑chain execution flow

1. **Order intake**
   - Collect a set of user orders from wallets / APIs.
   - Validate basic structure and signatures (off‑chain).

2. **Parallel simulation**
   - For each order (in parallel):
     - simulate Uniswap path,
     - compute expected output,
     - check if `minAmountOut` is realistic,
     - classify as valid/invalid.

3. **Conflict detection**
   - Detect conflicting orders (e.g., same user, same funds, same nonce).
   - Resolve by:
     - prioritizing orders,
     - dropping conflicting ones,
     - re‑batching.

4. **Batch construction**
   - Construct a final `Order[]` with only valid, non‑conflicting orders.
   - Optionally compute:
     - expected aggregate volume,
     - expected fee metrics,
     - pre‑trade risk metrics.

5. **Governance & metric pre‑check (off‑chain)**
   - Query `getGovernanceHealth()` on ParallelDEX.
   - If `psi5Ok == false` or `seOk == false` or `isPaused == true`, **do not** submit batch.

6. **On‑chain submission**
   - Submit `executeParallelBatch(orders)` from an executor address.
   - Handle reverted transactions (insufficient allowance, router failure, etc.).

---

### 1.4 On‑chain execution semantics

On‑chain, `executeParallelBatch` is:

- **Sequential** in the EVM loop.
- Guarded by:
  - `nonReentrant`,
  - `enforceThresholds` (ψ₅, SE),
  - `whenNotPaused`.

This ensures:

- deterministic behavior,
- aligned with metrics & governance,
- safe under adversarial conditions.

---

### 1.5 Failure modes

- Expired orders → revert the entire batch (current behavior) or future v2: soft‑fail per order.
- Router failures → revert the batch.
- Governance breaches (ψ₅/SE thresholds) → revert at `enforceThresholds`.
- Paused state → revert at `whenNotPaused`.
