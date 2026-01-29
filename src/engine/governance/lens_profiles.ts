/**
 * ISA Fabric — Governance Engine
 * lens_profiles.ts
 *
 * Loads governance lens profiles from schema.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface LensProfiles {
  reviewer: Record<string, number>;
  steward: Record<string, number>;
  emergency: Record<string, number>;
}

export function loadLensProfiles(): LensProfiles {
  const filePath = path.join(
    process.cwd(),
    "schemas",
    "governance",
    "isa-lens-profiles.yaml"
  );

  const file = fs.readFileSync(filePath, "utf8");
  return yaml.load(file) as LensProfiles;
}
