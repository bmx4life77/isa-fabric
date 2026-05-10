### **Appendix T – Canonical Test Vectors

**Appendix T – Canonical Test Vectors**  
**Version:** v1.0  
**Status:** Canonical, Sealed under CUAP and BEP  
**Cross-references:** Article VII (Auditability and Replay Guarantees), Article XXVIII (Event-Driven Execution), Article XXXIV (Uniform Contraction Doctrine), Article XXXV (Σ(t)), Appendix J (Σ(t) ABI), Appendix K (Preisach Plane), Appendix D (Execution Envelope)

**T.1 Purpose**  
This appendix provides the sealed, canonical test vectors required for BIV verification, implementation compliance checking, and replay determinism validation. These vectors ensure that all lawful implementations behave identically.

**T.2 Required Test Vector Categories**

**T.2.1 Genesis State Vector**  
- Σ(0) — Initial canonical state with all invariants at baseline.

**T.2.2 Normal Operation Sequences**  
- Standard operator execution sequences that exercise lawful transitions.

**T.2.3 Emergency and Recovery Sequences**  
- Activation of conservative mode (P0/S0/E0) and return to safe basin.

**T.2.4 Preisach Hysteresis Tests (Appendix K)**  
- Sequences demonstrating wiping-out property, congruency, rate-independence, and α < β enforcement.  
- Major loop vs minor loop behavior.

**T.2.5 JHI Detection and Elevation**  
- Test cases for observation, NatSpec++ encoding, Invariarch evaluation, and BEP elevation of a Jurisdiction Hybrid Invariant.

**T.2.6 Revocation Engine Tests**  
- Lawful revocation event sequences and resulting Σ(t+1) reconstruction.

**T.2.7 Execution Envelope and Resource Limit Tests**  
- Tests for envelope classification, resource exhaustion, STM fallback, and deterministic parallel execution.

**T.3 Format and Usage Requirements**

T.3.1 All test vectors SHALL be provided in both human-readable and machine-readable (binary / JSON) formats.  
T.3.2 Each vector SHALL include input events, expected Σ(t) output, expected proof bundle, and expected BIV verdict.  
T.3.3 Implementations MUST pass all sealed test vectors to claim compliance with v6.1.  
T.3.4 Any deviation from expected outputs SHALL be treated as a constitutional violation.

**T.4 Sealing Clause**  
This appendix and all contained test vectors are immutable except through full BEP ratification and CUAP procedures. They form part of the supreme law of ISA Fabric and SHALL be used by BIV for all verification activities.