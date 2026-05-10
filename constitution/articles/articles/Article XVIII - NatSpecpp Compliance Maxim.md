# 📘 **ARTICLE XVIII — NATSPEC++ COMPLIANCE MAXIM**  
### *Constitutional Principle — Binding, Non‑Waivable*

**XVIII.0 — Purpose**  
NatSpec++ is the exclusive semantic interface between executable code and the ISA Fabric Constitution.  
All constitutional metadata, invariants, governance clauses, and evaluative signals must be expressed through NatSpec++ annotations that comply with this Maxim.  
Non‑compliance constitutes a constitutional fault.

**XVIII.1 — Canonical Annotation Requirement**  
Every canonical definition must begin with:  

@custom:natspecpp canonical=true


**XVIII.2 — Namespace Exclusivity**  
Only the following namespaces are permitted:  
`constitutional`, `governance`, `psi5`, `theta`, `divergent`, `metrics`, `indices`, `interpretive`, `telemetry`, `lattice`, `envelope`, `separation`, `blvdb`, `bep`.

**XVIII.3 — Key Format**  
Keys must be kebab‑case:  

^[a-z][a-z0-9-]*$


**XVIII.4 — Value Format**  
Values must be numeric, symbolic (`A`, `B-L0`, etc.), or lowercase identifiers.

**XVIII.5 — Separation Doctrine Enforcement**  
Interpretive namespaces may not declare failure modes, enforcement decisions, or authority sources.

**XVIII.6 — Failure Mode Prohibition**  
NatSpec++ annotations must not reference failure modes.  
Failure modes are emitted only by Pneuma.

**XVIII.7 — Proof‑of‑Correctness Integration**  
During BIV, all NatSpec++ annotations are linted.  
Any violation produces a constitutional fault and blocks execution.

**XVIII.8 — Non‑Regression Clause**  
NatSpec++ annotations are subject to Article II.  
No weakening of semantic guarantees is permitted.

**XVIII.9 — Amendment Procedure**  
Changes to the NatSpec++ schema require BEP proposal, stress testing, BIV replay, and non‑regression proof.

---

# 📘 **CANONICAL NATSPEC++ STYLE GUIDE**

### **1. Annotation Format**

/// @custom:natspecpp <namespace>:<key>=<value>


### **2. Required Header**

/// @custom:natspecpp canonical=true


### **3. Allowed Namespaces**
- constitutional  
- governance  
- psi5  
- theta  
- divergent  
- metrics  
- indices  
- interpretive  
- telemetry  
- lattice  
- envelope  
- separation  
- blvdb  
- bep  

### **4. Key Format**
- kebab‑case only  
- no camelCase, snake_case, or uppercase  

### **5. Value Format**
- numeric: `0.85`  
- symbolic: `B-L0`  
- identifiers: `psi5-se`, `enabled`, `stable`  

### **6. Separation Doctrine Rules**
Interpretive namespaces cannot reference:

- failure modes  
- enforcement decisions  
- authority sources  

### **7. Forbidden**
- `failure-mode:detected=FM-P002`  
- `governance:state=emergency` (unless constitutional)  
- `interpretive:authority-source=psi5`  

---

# 📘 **NATSPEC++ LINTER SPECIFICATION**

### **Rule 1 — Annotation Format**
Must match:

^///\s*@custom:natspecpp\s+([a-z]+):([a-z0-9-]+)=([^\s]+)$


### **Rule 2 — Namespace Validation**
Namespace must be in the canonical list.

### **Rule 3 — Key Validation**
Key must match:

^[a-z][a-z0-9-]*$


### **Rule 4 — Value Validation**
Value must be:

- numeric (`^[0-9]+(\.[0-9]+)?$`)  
- symbolic (`A`, `B-L0`, `B-L1`, `B-L2`, `C`)  
- identifier (`^[A-Za-z0-9.-]+$`)  

### **Rule 5 — Canonical Header**
Every canonical block must contain:

canonical=true


### **Rule 6 — Separation Doctrine**
Interpretive namespaces cannot contain:

- `authority-source`  
- `enforcement`  
- `decision`  
- `state`  
- any FM reference  

### **Rule 7 — Failure Mode Prohibition**
Values matching `FM-[A-Z][0-9]+` are forbidden.

### **Rule 8 — Reserved Keys**
- `constitutional:article` → numeric  
- `governance:authority-source` → `psi5`, `psi5-se`, or `se`  
- `psi5:verification` → numeric 0–1  

### **Rule 9 — Non‑Regression**
Removing or weakening annotations triggers a constitutional fault.

---

# 📘 **NATSPEC++ JSON SCHEMA**

json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "NatSpec++Annotation",
  "type": "object",
  "properties": {
    "namespace": {
      "type": "string",
      "enum": [
        "constitutional",
        "governance",
        "psi5",
        "theta",
        "divergent",
        "metrics",
        "indices",
        "interpretive",
        "telemetry",
        "lattice",
        "envelope",
        "separation",
        "blvdb",
        "bep"
      ]
    },
    "key": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$"
    },
    "value": {
      "type": "string",
      "pattern": "^[A-Za-z0-9.-]+$"
    },
    "raw": {
      "type": "string"
    }
  },
  "required": ["namespace", "key", "value"],
  "additionalProperties": false
}
