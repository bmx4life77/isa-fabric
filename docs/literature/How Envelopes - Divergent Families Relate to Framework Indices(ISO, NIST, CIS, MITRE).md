### 1. How envelopes + divergence families relate to framework indices (ISO, NIST, CIS, MITRE)

Think of it like this:

- **Framework indices (ISO, NIST, CIS, MITRE)**  
  These are *external coordinate systems*—they describe controls, practices, and requirements in their own language.

- **Your lattice (axes + vertices + envelopes + divergence families)**  
  This is an *internal coordinate system*—it describes governance resilience, authority purity, interpretive robustness, etc., in your own constitutional semantics.

**Envelopes + divergence families are the bridge.**

- **Envelopes**  
  Capture *how a system behaves under stress* across your axes (Axis 9 especially).  
  They answer:  
  > “What happens to authority, metrics, emergencies, calibration, interpretation when we push this system?”

- **Divergence families**  
  Capture *how and where a system deviates* from a reference pattern or baseline.  
  They answer:  
  > “Where does this system’s behavior meaningfully diverge from what we’d expect from a ‘healthy’ or ‘aligned’ system?”

When you map to ISO/NIST/CIS/MITRE:

- You don’t map **vertex → control** directly.  
- You map **envelope patterns + divergence signatures → framework posture**.

Example:

- A system with:
  - strong authority purity (Axis 1)  
  - strong metric integrity (Axis 3)  
  - strong emergency hysteresis (Axis 4)  
  - but high narrative susceptibility delta (V9.5)  

  …might *look* ISO/NIST compliant on paper, but your envelope shows it’s fragile under narrative pressure. That’s a divergence family: **“Narrative‑fragile but control‑compliant.”**

So:

- **Framework indices tell you what’s “on the checklist.”**  
- **Envelopes + divergence families tell you how that “checklist system” actually behaves under stress.**

---

### 2. How they drive FRE (Failure/Resilience Envelope)

FRE is basically:

> “The shape of how resilience deforms under stress.”

Envelopes + divergence families drive FRE by:

- **Envelopes:**  
  - You run stress scenarios (metric failure, emergency overuse, calibration abuse, narrative attack).  
  - You observe how scores shift across axes (Axis 9 deltas).  
  - That *shape* is the FRE.

- **Divergence families:**  
  - You cluster systems by how their envelopes deform.  
  - “This family collapses under calibration abuse.”  
  - “This family collapses under narrative pressure.”  
  - “This family is robust except under cross‑system drift.”

FRE isn’t just a number—it’s a *profile* of how the lattice bends and where it breaks.

---

### 3. How they drive calibration

Calibration, in your architecture, is **not** “tuning knobs until scores look nice.”

Envelopes + divergence families make calibration:

- **Targeted:**  
  You don’t calibrate blindly—you calibrate where the envelope shows fragility.

- **Constrained by non‑regression:**  
  Calibration is only valid if:
  - it doesn’t shrink the resilience envelope  
  - it doesn’t move the system into a worse divergence family  
  - it doesn’t increase authority drift, narrative susceptibility, or emergency abuse risk

- **Evidence‑driven:**  
  You calibrate *because* the FRE and divergence patterns show a specific failure mode, not because someone “feels” like tuning.

So:

> Envelopes tell you *where* to calibrate.  
> Divergence families tell you *what kind* of calibration is safe or necessary.  
> Non‑regression tells you *what calibration is forbidden*.

---

### 4. How they drive adversarial runs

This is where your system gets teeth.

Adversarial runs are:

> “Deliberate attempts to break the system along its weakest envelope dimensions.”

Envelopes + divergence families drive adversarial runs by:

- **Identifying attack surfaces:**  
  - Narrative‑fragile systems → adversarial narrative scenarios  
  - Calibration‑fragile systems → adversarial calibration proposals  
  - Metric‑fragile systems → adversarial metric corruption  
  - Cross‑system‑fragile systems → federated drift scenarios  

- **Defining adversarial families:**  
  - “Narrative adversary”  
  - “Calibration adversary”  
  - “Metric adversary”  
  - “Cross‑system adversary”  

- **Measuring adversarial resilience:**  
  - You run adversarial scenarios.  
  - You observe how the envelope deforms.  
  - You classify the system into divergence families based on how it fails.

This is how you turn:

- ISO/NIST/CIS/MITRE → “control coverage”  
into  
- Envelopes + divergence families → “adversarial resilience profile.”

---

### Direct answer in one line

- **Envelopes + divergence families** map your lattice to external frameworks by showing how “compliant” systems actually behave under stress.  
- They **define FRE** by shaping how resilience deforms.  
- They **guide calibration** by showing where tuning is needed and what’s forbidden.  
- They **power adversarial runs** by turning weaknesses into structured attack scenarios.
