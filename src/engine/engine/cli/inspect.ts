/**
 * ISA Fabric — CLI Engine
 * inspect.ts
 *
 * Provides inspection commands for schema-driven components.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function runInspectCommand(args: string[]) {
  const target = args[0];

  if (!target) {
    console.error(
      "Usage: isa inspect <profiles|macro-state|thresholds|lens-profiles|responsibility>"
    );
    process.exit(1);
  }

  // Metrics Profiles
  if (target === "profiles") {
    const filePath = path.join(
      process.cwd(),
      "schemas",
      "metrics",
      "isa-metrics-profiles.yaml"
    );
    printYaml(filePath);
    return;
  }

  // Macro-State
  if (target === "macro-state") {
    const filePath = path.join(
      process.cwd(),
      "schemas",
      "macro_state",
      "isa-macro-state.yaml"
    );
    printYaml(filePath);
    return;
  }

  // Governance Thresholds
  if (target === "thresholds") {
    const filePath = path.join(
      process.cwd(),
      "schemas",
      "governance",
      "isa-thresholds.yaml"
    );
    printYaml(filePath);
    return;
  }

  // Governance Lens Profiles
  if (target === "lens-profiles") {
    const filePath = path.join(
      process.cwd(),
      "schemas",
      "governance",
      "isa-lens-profiles.yaml"
    );
    printYaml(filePath);
    return;
  }

  // Responsibility Profiles
  if (target === "responsibility") {
    const filePath = path.join(
      process.cwd(),
      "schemas",
      "governance",
      "isa-responsibility.yaml"
    );
    printYaml(filePath);
    return;
  }

  console.error(`Unknown inspect target: ${target}`);
  process.exit(1);
}

function printYaml(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`Schema file not found: ${filePath}`);
    process.exit(1);
  }

  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(file);

  console.log(JSON.stringify(data, null, 2));
}
