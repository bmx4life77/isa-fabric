# ISA Fabric — Metrics Schemas

This folder contains schema files and configuration profiles related to ISA Metrics. These artifacts define the baseline metric profiles, workload weighting rules, and other structural components used by the metrics engine, modulation engine, governance thresholds, and domain‑pack logic.

## Included Files

### **isa-matrics-profiles.yaml**
Defines:

- baseline metric profiles (β, VU, iota, phi, psi₅)  
- workload/domain‑pack weighting profiles (DEX, Bridge, etc.)  

This file serves as a canonical configuration for:

- composite scoring  
- domain‑specific SE  
- governance gating thresholds  
- calibration and analysis tools  
- CLI inspection utilities  

## Purpose

The schemas in this folder ensure that:

- metric definitions remain consistent  
- domain‑pack logic is reproducible  
- engines can load standardized configurations  
- contributors can extend metrics safely  
- research and governance remain aligned  

This directory is part of the ISA Fabric standards layer and is included in Zenodo releases.
