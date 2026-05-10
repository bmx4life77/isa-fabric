# **APPENDIX B — Lineage Registry Specification**  
### *Canonical Specification for Constitutional Lineage, Identity, and Ancestry*

**SHA-256:** *8e5138f1b02fa495b2dbc1126404c09c8f178589b7f9ca5e8434c4b6c6649eda*

The Lineage Registry is the constitutional memory of ISA Fabric.  
It preserves ancestry, identity, mitotic events, and genealogical correctness across all forks, daughters, and descendants.

This appendix defines the **canonical schema**, **validation rules**, and **operational semantics** of the Lineage Registry.

"This Appendix is an integral, sealed component of Genesis Governance v6.1. It is immutable except through full BEP ratification and CUAP procedures. Any deviation, reinterpretation, or extension without amendment is a constitutional violation."

---

# **B.1 Purpose**

The Lineage Registry SHALL:

- preserve genealogical truth  
- ensure identity integrity  
- prevent unauthorized forks  
- maintain replay‑verifiable ancestry  
- anchor all constitutional organisms in a sealed lineage  

Referenced in Articles XIV, XXXII, XXXIII.

---

# **B.2 Canonical Lineage Record Structure**

Each constitutional organism SHALL have a lineage record:

```
LineageRecord {
    ID: String,
    parent_id: String | NULL,
    lineage_path: String,
    generation: Integer,
    birth_timestamp: t,
    birth_event: "genesis" | "mitosis" | "promotion" | "restoration",
    daughters: [String],
    canonical_definition_hash: Hash,
    identity_hash: Hash,
    blvdb_pointer: Hash,
    status: "active" | "revoked" | "archived"
}
```

### **Field Definitions**

- **ID** — cryptographically unique identity  
- **parent_id** — NULL for genesis, otherwise parent’s ID  
- **lineage_path** — e.g., `root.A.B2`  
- **generation** — depth of lineage tree  
- **birth_event** — genesis, mitosis, promotion, restoration  
- **daughters** — list of direct descendants  
- **canonical_definition_hash** — hash of normative definition  
- **identity_hash** — hash of identity tuple  
- **blvdb_pointer** — pointer to BLVDB mens/corpus/anima  
- **status** — active, revoked, archived  

---

# **B.3 Lineage Path Rules**

### **B.3.1 Path Construction**

Let parent lineage be `L`.

Daughters SHALL receive:

```
L.A
L.B
```

Granddaughters:

```
L.A.A
L.A.B
L.B.A
L.B.B
```

### **B.3.2 Generation Depth**

Generation SHALL equal the number of dots in lineage_path.

### **B.3.3 Path Immutability**

lineage_path SHALL be immutable once assigned.

---

# **B.4 Lineage Validation Rules**

### **B.4.1 Parent Existence**

Every non‑genesis record MUST reference a valid parent.

### **B.4.2 Bidirectional Consistency**

If A lists B as a daughter,  
B MUST list A as parent.

### **B.4.3 Identity Anchoring**

identity_hash MUST match the canonical identity tuple.

### **B.4.4 BLVDB Anchoring**

blvdb_pointer MUST reference a valid BLVDB entry.

### **B.4.5 Revocation Propagation**

If a parent is revoked:

- all descendants SHALL be marked “revoked‑by‑ancestry”  
- lineage review SHALL be triggered  

---

# **B.5 Lineage Registry Operations**

### **B.5.1 Register**

```
register(identity, lineage_record)
```

### **B.5.2 Update**

Only allowed for:

- adding daughters  
- updating status  
- adding BLVDB pointers  

### **B.5.3 Revoke**

```
revoke(ID, reason)
```

Triggers:

- BLVDB logging  
- lineage propagation  
- conservative mode  

### **B.5.4 Restore**

Allowed only under:

- rollback  
- mitosis failure recovery  
- constitutional emergency  

---

# **B.6 Constitutional Guarantees**

This Appendix guarantees:

- sealed lineage  
- replay‑verifiable ancestry  
- identity integrity  
- genealogical correctness  
- revocation safety 