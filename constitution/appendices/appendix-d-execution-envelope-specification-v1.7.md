### **Appendix D – Execution Envelope Specification**

**Purpose**  
This appendix defines the bounded runtime environment within which all operators execute, as required by Articles XI, XII, XXVIII, and XXIX. It ensures deterministic, replay-verifiable execution while enforcing safety and resource limits.

**D.1 Core Invariants**  
D.1.1 All operator execution SHALL occur within defined resource envelopes. Exceeding any limit triggers rejection and conservative mode.  
D.1.2 Execution SHALL be deterministic: identical inputs and event sequences produce identical outputs and state transitions.  
D.1.3 Parallel execution (optimistic with STM fallback) is permitted only if it preserves bitwise-identical results to sequential execution.

**D.2 Resource Boundaries**  
The envelope defines limits on CPU steps, memory, event emission, nesting depth, and hysteron updates. These limits are sealed and may only be changed by constitutional amendment.

**D.3 Event Emission and Reduction**  
Operators emit events rather than directly mutating Σ(t). The canonical reduction algorithm Reduce(Events₀→t) reconstructs Σ(t) deterministically, respecting causal stratification (three layers) as defined in Article XXIX.

**D.4 Compliance and Test Vectors**  
Implementations MUST pass sealed test vectors that verify resource enforcement, determinism, causal stratification, and conservative mode triggering. Non-deterministic or non-compliant behavior is a constitutional violation.