# **Article XXIX — Causal Event Stratification**

**29.1**  
All events within ISA Fabric SHALL be organized into a three‑layer causal hierarchy:

### **(a) Execution Layer**  
Events of type **operator_execution**, representing the root cause of all transitions.

### **(b) Attributed Transition Layer**  
Events of type **hysteron_transition** or **embedded_transition**, annotated with operator identity and causal metadata.

### **(c) Primitive Transition Layer**  
Events of type **raw_transition**, representing the minimal state changes required to update Σ(t).

---

**29.2**  
Each layer SHALL maintain:

- causal linkage  
- temporal ordering  
- cryptographic integrity  
- replay determinism  

**29.3**  
No layer MAY contradict the layer above it.  
Primitive transitions MUST be derivable from attributed transitions, which MUST be derivable from operator executions.

**29.4**  
Causal stratification SHALL be used to:

- validate operator authority  
- detect unauthorized transitions  
- enforce lineage purity  
- reconstruct Σ(t)  
- detect drift and anomalies  

**29.5**  
Any break in causal stratification SHALL:

- trigger conservative mode  
- initiate lineage review  
- require full replay verification  

**29.6**  
Causal stratification SHALL be treated as a constitutional invariant.