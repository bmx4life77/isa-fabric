/**
 * ISA Fabric — Governance Engine
 * thresholds.ts
 *
 * Loads governance thresholds from schema.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Thresholds } from "./types";

export function loadThresholds(): Thresholds {
  const filePath = path.join(
    process.cwd(),
    "schemas",
    "governance",
    "isa-thresholds.yaml"
  );

  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(file) as Thresholds;

  return data;
}

export function checkThresholds(metrics: {
  psi5: number;
  SE: number;
}): string[] {
  const t = loadThresholds();
  const reasons: string[] = [];

  if (metrics.psi5 > t.psi5_max) {
    reasons.push(`psi5 exceeds maximum allowed (${metrics.psi5} > ${t.psi5_max})`);
  }

  if (metrics.SE < t.SE_min) {
    reasons.push(`SE below minimum required (${metrics.SE} < ${t.SE_min})`);
  }

  return reasons;
}
