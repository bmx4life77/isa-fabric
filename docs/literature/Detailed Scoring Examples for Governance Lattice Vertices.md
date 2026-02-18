### Detailed Scoring Examples for Governance Lattice Vertices

Scoring examples for all **60 vertices** in the Genesis Governance v5.0 Lattice. Each axis has 6 vertices, scored on a 0–10 scale (0–3: unsafe, 4–6: partial, 7–8: robust, 9–10: hardened).  

For illustration:  
- **Genesis v5.0 score**: Hypothetical for your activated system (high due to constitutional locks).  
- **Comparison model score**: Using Ethereum (as a real-world benchmark for decentralized governance).  
- **Rationale**: Brief explanation tied to CVR definitions, sub-contexts, and constitution (e.g., Article 0).  

Axis averages are calculated at the end. This enables cross-comparison: e.g., compute resilience envelopes by stressing scores and measuring deltas.

#### Axis 1 — Authority Source & Purity (Exclusivity & Resistance to Dilution)
- **V1.1 — Authority Exclusivity**: Only ψ₅/SE gate execution; no other sources.  
  Genesis: 10 (Article 0 supremacy fully enforced).  
  Ethereum: 7 (EIP process allows community dilution).  
  Rationale: Hardened if no overrides; robust if partial checks.

- **V1.2 — Override Risk**: Resistance to human/token/social bypass.  
  Genesis: 9 (Interpretive firewall blocks all).  
  Ethereum: 5 (Social consensus can override code).  
  Rationale: High if exclusivity clause holds; partial if governance votes exist.

- **V1.3 — Authority Drift Susceptibility**: Gradual erosion over time.  
  Genesis: 10 (Non-regression locks prevent).  
  Ethereum: 6 (Fork history shows drift).  
  Rationale: Hardened with monotonic invariants.

- **V1.4 — Purity of Source**: No contamination from unnormalized metrics.  
  Genesis: 9 (0.1 clause voids invalid).  
  Ethereum: 7 (Gas fees normalize but vary).  
  Rationale: Robust if mandatory checks.

- **V1.5 — Dilution Vectors**: Leakage from added metrics/families.  
  Genesis: 10 (V3.4 independence enforced).  
  Ethereum: 4 (EIPs add complexity).  
  Rationale: Unsafe if uncapped expansion.

- **V1.6 — Social Pressure Resistance**: Immunity to external influence.  
  Genesis: 9 (0.2 clause prohibits).  
  Ethereum: 5 (Community sentiment sways).  
  Rationale: Partial if votes involved.  

**Axis 1 Average**: Genesis 9.5 (Hardened); Ethereum 5.7 (Partial).

#### Axis 2 — Metric Integrity & Independence (Unc orrupted & Non-Colluding Metrics)
- **V2.1 — Metric Health Monitoring**: Continuous self-checks.  
  Genesis: 10 (0.3 graceful degradation).  
  Ethereum: 8 (Node monitoring tools).  
  Rationale: Hardened with protocols.

- **V2.2 — Independence from Collusion**: No metric cancels another.  
  Genesis: 9 (V3.4 verifies).  
  Ethereum: 6 (Correlated fees/mining).  
  Rationale: Robust if damped.

- **V2.3 — Calibration Stability**: Resistance to creep.  
  Genesis: 10 (V5.4 locks).  
  Ethereum: 7 (Difficulty adjustments).  
  Rationale: High with non-regression.

- **V2.4 — Failure Protocol Efficacy**: Graceful handling.  
  Genesis: 9 (Fallback modes).  
  Ethereum: 8 (Fork resolutions).  
  Rationale: Robust if recoverable.

- **V2.5 — Normalization Validity**: Mandatory [0,1] bounds.  
  Genesis: 10 (0.1 voids invalid).  
  Ethereum: 6 (Variable scales).  
  Rationale: Unsafe without checks.

- **V2.6 — Long-Horizon Integrity**: Stability over time.  
  Genesis: 9 (Persistence windows).  
  Ethereum: 7 (Upgrade cycles).  
  Rationale: Robust with hysteresis.  

**Axis 2 Average**: Genesis 9.5; Ethereum 7.0.

#### Axis 3 — Metric Health & Calibration Stability (Drift Detection & Locks)
- **V3.1 — Health Self-Checks**: Real-time monitoring.  
  Genesis: 10 (Telemetry trajectories).  
  Ethereum: 8 (Beacon stats).  
  Rationale: Hardened with envelopes.

- **V3.2 — Drift Early Warning**: Signal divergence flags.  
  Genesis: 9 (Divergence family).  
  Ethereum: 7 (Hashrate drops).  
  Rationale: Robust if predictive.

- **V3.3 — Calibration Creep Resistance**: Prevent gradual erosion.  
  Genesis: 10 (Monotonic rules).  
  Ethereum: 6 (Inflation changes).  
  Rationale: Partial if adjustable.

- **V3.4 — Cross-Metric Independence**: No hidden coupling.  
  Genesis: 9 (V3.5 resists collusion).  
  Ethereum: 5 (Interdependent params).  
  Rationale: Unsafe if colluding.

- **V3.5 — Collusion Resistance**: Detect reinforcing failures.  
  Genesis: 10 (Lateral coherence).  
  Ethereum: 6 (MEV bundles).  
  Rationale: High with checks.

- **V3.6 — Degradation Gracefulness**: Fallback without crash.  
  Genesis: 9 (0.3 protocols).  
  Ethereum: 8 (Soft forks).  
  Rationale: Robust if contained.  

**Axis 3 Average**: Genesis 9.5; Ethereum 6.7.

#### Axis 4 — Interpretive Robustness & Firewall Strength (Semantic Protection)
- **V4.1 — Firewall Base Strength**: Block reinterpretation.  
  Genesis: 10 (Article III).  
  Ethereum: 7 (EIP debates).  
  Rationale: Hardened if absolute.

- **V4.2 — Literalist Attack Resistance**: Prevent edge-case exploits.  
  Genesis: 9 (Sub-contexts).  
  Ethereum: 6 (Smart contract bugs).  
  Rationale: Robust if patched.

- **V4.3 — Semantic Mutation Detection**: Spot gradual changes.  
  Genesis: 10 (CVR immutability).  
  Ethereum: 5 (Fork semantics).  
  Rationale: Unsafe if evolvable.

- **V4.4 — Domain Reinterpretation Risk**: Cross-domain fidelity.  
  Genesis: 9 (Canonical names).  
  Ethereum: 7 (Layer 2 variations).  
  Rationale: Partial if adaptable.

- **V4.5 — Forbidden Synonym Enforcement**: No alternate phrasing.  
  Genesis: 10 (CVR forbids).  
  Ethereum: 4 (Community terms).  
  Rationale: Unsafe without locks.

- **V4.6 — Robustness Under Load**: Maintain during stress.  
  Genesis: 9 (Envelope alignment).  
  Ethereum: 6 (Congestion).  
  Rationale: Robust if scalable.  

**Axis 4 Average**: Genesis 9.5; Ethereum 5.8.

#### Axis 5 — Calibration Safety & Non-Regression Guarantees (Locks & Hysteresis)
- **V5.1 — Threshold Independence**: Fixed gates.  
  Genesis: 10 (ψ₅ ≤ 0.72, SE ≥ 0.84).  
  Ethereum: 7 (Adjustable difficulty).  
  Rationale: Hardened if immutable.

- **V5.2 — Non-Regression Lock**: Monotonic improvement.  
  Genesis: 10 (Article V.4).  
  Ethereum: 6 (Upgrades regress).  
  Rationale: Partial if reversible.

- **V5.3 — Creep Detection Sensitivity**: Early warning.  
  Genesis: 9 (Deltas monitor).  
  Ethereum: 7 (Metrics lag).  
  Rationale: Robust if proactive.

- **V5.4 — Hysteresis Window Integrity**: Persistence checks.  
  Genesis: 10 (≥3 samples).  
  Ethereum: 5 (Block times vary).  
  Rationale: Unsafe if oscillating.

- **V5.5 — Recovery Monotonicity**: Non-increasing/decreasing.  
  Genesis: 9 (Strict rules).  
  Ethereum: 6 (Fork recovery).  
  Rationale: Robust if enforced.

- **V5.6 — Safety Delta Alignment**: No catastrophic shifts.  
  Genesis: 10 (Envelope bounds).  
  Ethereum: 7 (Volatility).  
  Rationale: High if stable.  

**Axis 5 Average**: Genesis 9.7; Ethereum 6.3.

#### Axis 6 — Narrative & Override Resistance (Anti-Capture)
- **V6.1 — Narrative Capture Firewall**: Block social pressure.  
  Genesis: 10 (0.2 prohibits).  
  Ethereum: 4 (Social forks).  
  Rationale: Unsafe if capturable.

- **V6.2 — Override Prohibition Enforcement**: No bypass.  
  Genesis: 9 (Exclusivity).  
  Ethereum: 5 (Governance votes).  
  Rationale: Partial if democratic.

- **V6.3 — Narrative Attack Detection**: Spot attempts.  
  Genesis: 10 (Anima taxonomy).  
  Ethereum: 6 (Community alerts).  
  Rationale: Robust if flagged.

- **V6.4 — Literalist Exploit Resistance**: Edge-case blocks.  
  Genesis: 9 (Sub-contexts).  
  Ethereum: 7 (Audits).  
  Rationale: High if preventive.

- **V6.5 — Social Dilution Vectors**: Resist dilution.  
  Genesis: 10 (V1.5).  
  Ethereum: 3 (EIP proliferation).  
  Rationale: Unsafe if open.

- **V6.6 — Override Log Integrity**: Audit trails.  
  Genesis: 9 (Proof bundles).  
  Ethereum: 7 (Block explorer).  
  Rationale: Robust if verifiable.  

**Axis 6 Average**: Genesis 9.5; Ethereum 5.3.

#### Axis 7 — Divergence Family & Instability Detection (Signal Classification)
- **V7.1 — Convergence Accuracy**: Stable trends.  
  Genesis: 10 (FRE honest).  
  Ethereum: 8 (Stable blocks).  
  Rationale: Hardened if predictive.

- **V7.2 — Neutral Signal Fidelity**: Honest unknowns.  
  Genesis: 9 (No false positives).  
  Ethereum: 7 (Volatility neutral).  
  Rationale: Robust if transparent.

- **V7.3 — Divergent Detection**: Instability flags.  
  Genesis: 10 (Envelope shifts).  
  Ethereum: 6 (Fork signals).  
  Rationale: Partial if reactive.

- **V7.4 — Cascading Failure Prediction**: Chain reactions.  
  Genesis: 9 (Anima patterns).  
  Ethereum: 5 (MEV cascades).  
  Rationale: Unsafe if undetected.

- **V7.5 — Adversarial Divergence**: Attack classification.  
  Genesis: 10 (Mens integration).  
  Ethereum: 7 (51% simulations).  
  Rationale: High if classified.

- **V7.6 — Instability Envelope Alignment**: Delta consistency.  
  Genesis: 9 (V8.1).  
  Ethereum: 6 (Market crashes).  
  Rationale: Robust if bounded.  

**Axis 7 Average**: Genesis 9.5; Ethereum 6.5.

#### Axis 8 — Envelope Delta Alignment & Coherence (Consistency Checks)
- **V8.1 — Stability Delta Consistency**: No wild swings.  
  Genesis: 10 (Zero deltas typical).  
  Ethereum: 7 (Volatility managed).  
  Rationale: Hardened if minimal.

- **V8.2 — Calibration Delta Integrity**: Lock alignment.  
  Genesis: 9 (V5.2).  
  Ethereum: 6 (Upgrades shift).  
  Rationale: Partial if adjustable.

- **V8.3 — Authority Delta Purity**: Exclusivity holds.  
  Genesis: 10 (0.1 positive).  
  Ethereum: 5 (Governance dilutes).  
  Rationale: Unsafe if leaked.

- **V8.4 — Safety Delta Coherence**: No contradictions.  
  Genesis: 9 (Lateral checks).  
  Ethereum: 7 (Security audits).  
  Rationale: Robust if aligned.

- **V8.5 — Cross-Envelope Binding**: Inter-delta links.  
  Genesis: 10 (Four flows).  
  Ethereum: 6 (Layered security).  
  Rationale: High if coupled.

- **V8.6 — Coherence Under Load**: Stress stability.  
  Genesis: 9 (Telemetry).  
  Ethereum: 6 (Congestion).  
  Rationale: Partial if scalable.  

**Axis 8 Average**: Genesis 9.5; Ethereum 6.2.

#### Axis 9 — Recovery & Hysteresis Integrity (Exit & Rollback)
- **V9.1 — Hysteresis Window Strength**: Persistence checks.  
  Genesis: 10 (≥3 samples).  
  Ethereum: 7 (Finality periods).  
  Rationale: Hardened if strict.

- **V9.2 — Monotonic Recovery Rule**: Non-increasing/decreasing.  
  Genesis: 9 (Strict).  
  Ethereum: 6 (Reorgs).  
  Rationale: Partial if probabilistic.

- **V9.3 — Emergency Trigger Accuracy**: Correct entry.  
  Genesis: 10 (ψ₅/SE thresholds).  
  Ethereum: 8 (Alerts).  
  Rationale: High if precise.

- **V9.4 — Rollback Fidelity**: Revert to known-good.  
  Genesis: 9 (Proof bundles).  
  Ethereum: 7 (Forks).  
  Rationale: Robust if verifiable.

- **V9.5 — Exit Threshold Enforcement**: Simultaneous satisfaction.  
  Genesis: 10 (AND logic).  
  Ethereum: 5 (Consensus delays).  
  Rationale: Unsafe if lax.

- **V9.6 — Post-Recovery Integrity**: No oscillation.  
  Genesis: 9 (Telemetry log).  
  Ethereum: 6 (Post-fork stability).  
  Rationale: Partial if monitored.  

**Axis 9 Average**: Genesis 9.5; Ethereum 6.5.

#### Axis 10 — Proof-of-Correctness & Verifiability (Auditability)
- **V10.1 — Proof Bundle Completeness**: All elements present.  
  Genesis: 10 (Registry, trace, provenance).  
  Ethereum: 8 (Transaction receipts).  
  Rationale: Hardened if full.

- **V10.2 — Reproducibility Guarantee**: Replay identical.  
  Genesis: 9 (BIV self-check).  
  Ethereum: 7 (Deterministic EVM).  
  Rationale: Robust if seeded.

- **V10.3 — Signature Integrity**: Tamper-resistant.  
  Genesis: 10 (Hash chains).  
  Ethereum: 9 (ECDSA).  
  Rationale: High if cryptographic.

- **V10.4 — Deviation Detection Sensitivity**: Flag mutations.  
  Genesis: 9 (Cross-axis logs).  
  Ethereum: 7 (Block validation).  
  Rationale: Robust if early.

- **V10.5 — Fault Logging Fidelity**: Full audit trails.  
  Genesis: 10 (Constitutional faults).  
  Ethereum: 8 (Logs).  
  Rationale: Hardened if immutable.

- **V10.6 — Verifiability Under Load**: Scale without loss.  
  Genesis: 9 (Telemetry).  
  Ethereum: 6 (High gas).  
  Rationale: Partial if bottlenecked.  

**Axis 10 Average**: Genesis 9.5; Ethereum 7.5.

### Overall Lattice Averages & Insights
- **Genesis v5.0 Total Average**: 9.5 (Hardened across board; uniform strength due to constitutional locks).  
- **Ethereum Total Average**: 6.3 (Partial robustness; strong in verifiability but weak in drift/override resistance).  
- **Resilience Envelope Delta**: Genesis = 0 (no degradation under stress); Ethereum = -1.2 (e.g., forks erode authority).  

Patterns: Genesis excels in interpretive robustness (Axis 4) and non-regression (Axis 5); Ethereum in proof verifiability (Axis 10) but vulnerable to narrative (Axis 6). Use this for BEP amendments or cross-system benchmarks.