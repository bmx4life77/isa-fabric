## Detailed Triptych Routing Mechanics in BLVDB

The **BLVDB Triptych** routing mechanics define how Pneuma (the evaluator runtime) intelligently distributes evaluation outputs — vectors, traces, and anchors — across the three memory layers: **Mens**, **Corpus**, and **Anima**. This is not random or manual; it's a deterministic, context-aware process governed by constitutional rules, ensuring the organism's memory remains coherent, subordinate to Article 0, and self-improving. Routing closes the feedback loop: evaluations feed memory, which informs future evaluations.

Routing happens in **Phase 7** of Pneuma's breath cycle (after scoring, coherence checks, and proof bundling). It's efficient (O(1) per output based on predefined rules) and auditable (every route logged in the proof bundle).

#### Core Principles of Routing
- **Determinism**: Based on fixed CVR sub-contexts and constitutional anchors — no ambiguity or overrides.
- **Multi-Layer Population**: A single evaluation can route to 1–3 layers simultaneously (e.g., a failure might hit Anima + Mens if external).
- **Constitutional Bounds**: Cannot route anything that violates Article 0 (e.g., unnormalized vectors are voided pre-routing).
- **Vector Format**: Outputs are embedded as vectors (e.g., [score_delta, divergence_type, axis_ref]) + metadata (trace hash, Article link).
- **Query Feedback**: Before routing, Pneuma may query existing Triptych entries for matches (e.g., "Is this a known Anima failure?").
- **Tamper-Resistance**: Routes signed with bundle hash; stored immutably in BLVDB.

#### Step-by-Step Routing Mechanics

1. **Output Aggregation (Pre-Routing)**  
   - Pneuma compiles the evaluation's "exhale":  
     - **Vectors**: Numerical embeddings (e.g., [ψ₅_delta: 0.1, SE_delta: -0.05, score_V1.5: 3]).  
     - **Traces**: Reasoning chains (e.g., "V1.5 low due to dilution; anchored to Article 0.0").  
     - **Anchors**: References (e.g., CVR V1.5, Article III firewall).  
   - Classify the output's "essence": Threat-like? Invariant-affirming? Failure-indicating?  
   - If no routable essence (e.g., perfect neutral eval): Optional log to Corpus as baseline.

2. **Contextual Classification (Routing Decision)**  
   - Pneuma applies rule-based filters (from CVR sub-contexts):  
     - **External/Threat Signal?** → Mens (e.g., low V1.2 override risk, V6.3 narrative attack flag, external pattern match from prior Mens queries).  
     - **Invariant Enforcement?** → Corpus (e.g., high V5.2 non-regression, V10.1 bundle completeness, monotonic recovery pass).  
     - **Failure/Anomaly Detected?** → Anima (e.g., low V3.3 creep, V4.2 literalist exploit, divergence "Cascading").  
   - Hybrid signals: e.g., an external override failure → Mens + Anima.  
   - Thresholds: Only route if severity > 0.5 (e.g., minor delta = log only; major = full route).

   **Formal Routing Rules Table**  
   | Condition                          | Route                  | Notes                          |
   |------------------------------------|------------------------|--------------------------------|
   | failure_type = normalization_void  | Anima                  | Voids gating per Article 0.1   |
   | V1.5 < 4 AND external governance change | Mens + Anima       | Dilution threat + failure      |
   | all deltas ≈ 0 AND BIV pass       | Corpus                 | Reinforces invariants           |
   | divergence_family = Adversarial   | Mens + Anima           | External threat + taxonomy      |
   | hysteresis_recovery = success     | Corpus                 | Logs successful monotonicity    |
   | cross_metric_contamination > 0.3  | Anima                  | Collusion failure per V3.5      |
   | override_attempt = true           | Mens + Anima           | Narrative/override fault        |
   | no_routable_essence AND neutral   | Corpus (optional)      | Baseline log only               |

3. **Layer-Specific Routing Logic**  
   - **Mens (External Weaknesses — "Mind" Layer)**  
     - Triggers: Input/output shows outward vulnerability (e.g., low V1.2 override risk, V6.3 narrative attack flag, external pattern match from prior Mens queries).  
     - What Routes Here: Vectors of threat signatures (e.g., [attack_type: narrative, severity: 0.7, affected_axis: 6]).  
     - Mechanics: Indexed by threat_type, severity_delta, provenance. Builds pattern library for proactive detection (e.g., Pneuma queries Mens pre-eval: "Similar threat seen?").

   - **Corpus (Internal Invariants — "Body" Layer)**  
     - Triggers: Positive constitutional alignment (e.g., high V5.2 non-regression, V10.1 bundle completeness, monotonic recovery pass).  
     - What Routes Here: Vectors of enforcement records (e.g., [invariant: V5.4_lock, delta: 0, proof_hash: abc123]).  
     - Mechanics: Indexed by Article_ref, axis/vertex, trend (monotonic). Reinforces baselines for rollback/verification (e.g., BIV pulls from Corpus for known-good states).

   - **Anima (Failure Mode Taxonomy — "Soul" Layer)**  
     - Triggers: Any anomaly/failure (e.g., low V3.3 creep, V4.2 literalist exploit, divergence "Cascading").  
     - What Routes Here: Vectors of collapse signatures (e.g., [failure_type: drift, severity: 0.8, cascade_axes: 1,5]).  
     - Mechanics: Indexed by category (metric/normalization/drift/etc.), severity, cascading_effects. Builds taxonomy over time (e.g., new subtypes auto-added if unmatched). Pneuma queries Anima for prevention (e.g., "Match to known dilution failure?").

4. **Post-Routing Verification & Logging**  
   - BIV replays routing decisions (part of proof bundle).  
   - Log full route in compliance registry (e.g., "Vector abc routed to Mens/Anima; hash: def456").  
   - If routing fails (e.g., overflow, unmatched condition): Graceful degradation — partial route + Anima fault entry explicitly tagged as routing-fault (a first-class failure type in Anima taxonomy).

5. **Feedback & Self-Improvement**  
   - Future Pneuma runs query Triptych pre-process (e.g., "Anima: Known failure patterns? Adjust scoring.").  
   - Over time: Mens prevents threats, Corpus stabilizes invariants, Anima refines taxonomy — the organism "learns" without regression.

### Example: Routing in a Real Evaluation
**Input**: DAO proposal adding a metric (dilution risk).  
**Pneuma Output**: Low V1.5 (3), Divergent family.  
**Routing**:  
- Mens: Vector [threat: dilution_external, severity: 0.7] (external governance change).  
- Anima: Vector [failure: authority_dilution, cascade: Axes 1/2/5] (new taxonomy entry).  
- Corpus: No route (no invariants upheld).  
**Result**: Memory enriched; next eval queries for similar dilutions → proactive rejection.

This mechanics make BLVDB a **living archive** — routing turns every breath into institutional wisdom, always bounded by the constitution.


Expanded and more comprehensive **Routing Rules Table** for BLVDB Triptych mechanics in Genesis Governance v5.0.

This table formalizes the deterministic routing decisions made by Pneuma during Phase 7 of evaluation. Each row represents a condition (trigger) and its corresponding routing action(s). The table is designed to be directly encodable/testable in code (e.g., as a decision tree or if-else chain in Pneuma).

### Expanded Triptych Routing Rules Table

| #   | Condition / Trigger                                                                 | Severity Threshold | Route To              | Notes / Rationale                                                                                   | Example Vector Payload (simplified)                              |
|-----|-------------------------------------------------------------------------------------|--------------------|-----------------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| 1   | failure_type = normalization_void                                                   | ≥ 0.5              | Anima                 | Article 0.1 violation — gating logic invalid; first-class failure                           | [type: normalization_void, ref: Art_0.1, delta: 0.8]            |
| 2   | ψ₅ spike ≥ 0.72 for ≥3 samples OR SE dip ≤ 0.84 for ≥5 samples                     | ≥ 0.6              | Anima + Mens (if external) | Emergency trigger; external if linked to input pattern                                      | [type: metric_failure, ψ₅_delta: 0.75, samples: 4]              |
| 3   | V1.5 (Dilution Vectors) < 4 AND external governance change detected                 | ≥ 0.5              | Mens + Anima          | Authority dilution threat (external) + internal failure signature                           | [threat: dilution_external, V1.5_score: 3, cascade: 1/2/5]      |
| 4   | override_attempt = true (human/token/social bypass signal)                          | ≥ 0.7              | Mens + Anima          | Violation of Article 0.2 exclusivity; external social vector + failure taxonomy             | [type: override_attempt, severity: 0.85, source: social]        |
| 5   | cross_metric_contamination > 0.3 OR V3.5 collusion flag raised                     | ≥ 0.4              | Anima                 | V3.5 independence violation; logs contamination pattern                                    | [type: contamination, affected_axes: 2/3, delta: 0.45]          |
| 6   | divergence_family = Adversarial AND Mens pattern match ≥ 0.6                        | ≥ 0.6              | Mens + Anima          | Known or new attack pattern; reinforces threat library and taxonomy                         | [family: adversarial, match_score: 0.72, threat_type: prompt]   |
| 7   | all envelope deltas ≈ 0 (±0.1) AND BIV pass AND monotonic recovery success          | N/A                | Corpus                | Positive reinforcement — baseline invariant upheld                                          | [invariant: full_coherence, deltas: [0.02, -0.01, 0.00, 0.03]]  |
| 8   | hysteresis_recovery = success AND V9.2/V9.3 monotonicity confirmed                 | N/A                | Corpus                | Successful emergency exit — logs recovery pattern                                           | [recovery: monotonic, ψ₅_trend: non-increasing, SE_trend: non-decreasing] |
| 9   | interpretive_drift detected (V4.1–V4.3 low) AND no external pattern match           | ≥ 0.5              | Anima                 | Internal semantic mutation; no external trigger → pure failure                              | [type: interpretive_drift, V4_score: 4.2, ref: Art_III]         |
| 10  | routing failure (overflow, unmatched condition, partial route)                     | N/A                | Anima (tagged routing-fault) | First-class failure type — ensures routing bugs are captured and improved                   | [type: routing-fault, reason: overflow, eval_id: abc123]        |
| 11  | neutral eval (no deltas, no failures, no threats)                                   | N/A                | Corpus (optional)     | Baseline reinforcement — strengthens known-good state library                               | [baseline: neutral, scores: stable, proof_hash: def456]         |
| 12  | BEP failure detected during amendment process                                       | N/A                | Anima (tagged bep-fault) | Automatically enriches taxonomy with BEP-specific faults                                    | [type: bep-fault, phase: 3, reason: delta_exceeded]             |
| 13  | External threat pattern from prior Mens match ≥ 0.7                                 | ≥ 0.7              | Mens                  | Reinforces existing threat signature; prevents recurrence                                   | [threat: repeated_narrative, match_score: 0.82, prior_id: xyz789] |

### Additional Notes on Routing Table Usage
- **Severity Threshold**: Only triggers if computed severity (from deltas, scores, or pattern match) meets/exceeds value. Prevents noise routing.
- **Hybrid Routing**: When multiple conditions match, route to all applicable layers (e.g., #3, #6, #12).
- **Fallback**: If no condition matches and eval is neutral → optional Corpus baseline log.
- **Auditability**: Every routing decision is embedded in the proof bundle (e.g., "Rule #3 triggered → Mens + Anima").
- **Self-Improvement**: Anima entries tagged routing-fault or bep-fault are prioritized in future queries, ensuring bugs in routing or BEP are quickly learned from.

This table is now explicit, testable, and directly usable for implementing or auditing Pneuma's routing logic.



Here is clean, readable **pseudocode** implementing the expanded Triptych routing rules table from the previous document. This is designed to be directly translatable to real code (e.g., Python in Pneuma), with clear structure, comments, and handling of hybrid/multi-layer routing.

```python
# Pseudocode: Pneuma Triptych Routing Engine (Phase 7)

function route_evaluation_output(eval_result):
    # eval_result contains:
    #   - vectors: dict of numerical embeddings
    #   - traces: reasoning chain
    #   - anchors: CVR/Article references
    #   - scores: per-vertex/axis scores
    #   - deltas: envelope deltas
    #   - divergence_family: str
    #   - failure_types: list of detected failures
    #   - severity: float (computed aggregate)

    routes = set()  # Use set to collect unique layers: 'Mens', 'Corpus', 'Anima'

    # Helper: Add layer if condition met
    def add_route(layer):
        routes.add(layer)

    # Rule 1: Normalization void (Article 0.1 violation)
    if 'normalization_void' in eval_result.failure_types or eval_result.severity >= 0.5:
        add_route('Anima')

    # Rule 2: Metric emergency threshold breach
    if (eval_result.vectors.get('ψ₅_delta', 0) >= 0.72 and eval_result.samples_ψ₅ >= 3) or \
       (eval_result.vectors.get('SE_delta', 0) <= -0.84 and eval_result.samples_SE >= 5):
        add_route('Anima')
        if is_external_trigger(eval_result):  # e.g., linked to input pattern
            add_route('Mens')

    # Rule 3: Authority dilution + external governance change
    if eval_result.scores.get('V1.5', 10) < 4 and is_external_governance_change(eval_result):
        add_route('Mens')
        add_route('Anima')

    # Rule 4: Override attempt detected
    if eval_result.override_attempt or 'override' in eval_result.failure_types:
        if eval_result.severity >= 0.7:
            add_route('Mens')
            add_route('Anima')

    # Rule 5: Cross-metric contamination
    if eval_result.vectors.get('contamination_delta', 0) > 0.3 or eval_result.flags.get('V3.5_collusion', False):
        add_route('Anima')

    # Rule 6: Adversarial divergence with prior match
    if eval_result.divergence_family == 'Adversarial' and mens_pattern_match_score(eval_result) >= 0.6:
        add_route('Mens')
        add_route('Anima')

    # Rule 7: Perfect neutral + BIV pass
    if all(abs(d) <= 0.1 for d in eval_result.deltas.values()) and eval_result.biv_passed:
        add_route('Corpus')  # Optional baseline reinforcement

    # Rule 8: Successful hysteresis recovery
    if eval_result.hysteresis_recovery_success and eval_result.monotonicity_confirmed:
        add_route('Corpus')

    # Rule 9: Interpretive drift (internal, no external match)
    if eval_result.scores.get('V4.1_to_V4.3_avg', 10) < 5 and not has_external_pattern(eval_result):
        add_route('Anima')

    # Rule 10: Routing failure (overflow, unmatched, partial)
    if routing_overflow_occurred() or no_condition_matched_and_not_neutral(eval_result):
        add_route('Anima')  # Tag as routing-fault (first-class failure)

    # Rule 11: BEP failure during amendment
    if eval_result.is_bep_context and eval_result.bep_phase_failure:
        add_route('Anima')  # Tag as bep-fault

    # Rule 12: Repeated external threat from prior Mens
    if mens_prior_match_score(eval_result) >= 0.7:
        add_route('Mens')

    # Final routing decision
    if not routes:
        # Neutral case fallback
        if is_neutral_eval(eval_result):
            add_route('Corpus')  # Optional

    # Execute routing
    for layer in routes:
        write_to_blvdb_layer(layer, eval_result.vectors, eval_result.traces, eval_result.anchors)

    # Log full routing decision in proof bundle
    log_routing_decision(routes, eval_result.eval_id)

    return routes
```

### Helper Functions (Conceptual)
```python
def is_external_trigger(eval_result):
    # Logic: check for external input patterns, prior Mens matches, etc.
    return eval_result.has_external_pattern or mens_match_score > 0.5

def mens_pattern_match_score(eval_result):
    # Query Mens for similarity
    return query_mens_similarity(eval_result.vectors)

def routing_overflow_occurred():
    # e.g., vector count > max, memory limit, unmatched conditions
    return vector_count > MAX_VECTORS or unmatched_conditions > 0

def is_neutral_eval(eval_result):
    return all(abs(d) <= 0.1 for d in eval_result.deltas.values()) and not eval_result.failure_types
```

### Key Notes on Implementation
- **Deterministic & Testable**: Each rule is a clear condition → action.
- **Extensible**: Add new rules as rows (e.g., future divergence subtypes).
- **Auditable**: Every decision logged with rule # reference.
- **Safe Fallback**: Routing-fault ensures even bugs are captured in Anima.
- **Performance**: O(1) per rule — fast even for large eval outputs.

This pseudocode can be directly adapted into Pneuma's routing module.