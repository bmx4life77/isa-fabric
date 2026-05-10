### **Appendix K – Canonical Preisach Plane Placement and Hysteron Semantics**

**Purpose**  
This appendix defines the geometry, state representation, update rules, and embedding of the Preisach plane as required by Articles VI, XIII, XXI, and related provisions. It forms the foundation of the organism’s path-dependent memory.

**K.1 Core Invariants**  
K.1.1 Every hysteron SHALL satisfy α < β at all times. Any transition violating this is invalid.  
K.1.2 The Preisach plane SHALL be embedded in Group 3 of Σ(t) in a deterministic, replay-verifiable manner.  
K.1.3 The plane’s geometry, discretization, and update rules are immutable except by constitutional amendment.

**K.2 Geometry and Discretization**  
The Preisach plane uses a canonical (α, β) coordinate system normalized to [−1, +1]. A fixed discretization grid (default N=64) SHALL be used unless amended. Only valid cells (α < β) contain active hysterons. Storage order is row-major by α then β.

**K.3 Hysteron State and Update Rules**  
Each hysteron maintains: current state, previous state, and last transition timestamp. Updates follow the standard Preisach rules driven by a normalized input stimulus u(t) derived from events. The macroscopic output H(t) is the weighted sum of active hysterons and contributes to state evolution.

**K.4 Sealing and Compliance**  
This specification is sealed under CUAP. Implementations MUST produce identical plane states for identical event sequences and initial conditions. Canonical test vectors (genesis plane and selected stimulus sequences) SHALL be included in this appendix.
