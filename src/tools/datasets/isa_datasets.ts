#!/usr/bin/env node
/**
 * ISA Fabric Dataset Generator CLI (TypeScript)
 * Usage: ts-node isa_datasets.ts <command> [options]
 */

import * as fs from "fs";
import * as path from "path";
import { ISADatasetGeneratorV2, generateProductionDatasets } from "./datasetGeneratorV2";

type Command =
  | "generate"
  | "list"
  | "info"
  | "validate"
  | "stats";

type ScenarioKey =
  | "baseline"
  | "ddos"
  | "insider"
  | "supply_chain"
  | "regulatory"
  | "all";

interface CLIArgs {
  command: Command;
  scenario: ScenarioKey;
  output: string;
}

function parseArgs(argv: string[]): CLIArgs {
  const [, , commandRaw, ...rest] = argv;

  const command = (commandRaw || "info") as Command;

  let scenario: ScenarioKey = "all";
  let output = "./datasets";

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--scenario" && rest[i + 1]) {
      scenario = rest[i + 1] as ScenarioKey;
      i++;
    } else if (arg === "--output" && rest[i + 1]) {
      output = rest[i + 1];
      i++;
    }
  }

  return { command, scenario, output };
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function saveDataset(name: string, data: any, outputDir: string) {
  ensureDir(outputDir);
  const filename = path.join(outputDir, `${name}.json`);
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Saved: ${filename}`);
}

function listScenarios() {
  console.log("Available scenarios:");
  console.log("  baseline     - Normal operation (7 days)");
  console.log("  ddos         - DDoS attack scenario (3 days)");
  console.log("  insider      - Insider threat (5 days)");
  console.log("  supply_chain - Supply chain disruption (4 days)");
  console.log("  regulatory   - Regulatory change impact (10 days)");
  console.log("  all          - All scenarios");
}

function info() {
  console.log("ISA Fabric Dataset Generator (TypeScript)");
  console.log("=========================================");
  console.log("Generates synthetic but realistic ISA metrics for:");
  console.log("  - Benchmarking ISA Fabric engines");
  console.log("  - Testing governance protocols");
  console.log("  - Validating cross-domain coupling");
  console.log("  - Stress testing under adversarial conditions");
  console.log("\nEach dataset includes:");
  console.log("  - Timestamps (ISO 8601, 2026 dates)");
  console.log("  - Core ISA metrics (β, ψ₅, SE, VU, φ, ι, divergence, ESI)");
  console.log("  - Multi-domain data for cross-domain analysis");
  console.log("  - Scenario-specific patterns and anomalies");
}

function generateAll(outputDir: string) {
  console.log("Generating all production datasets...");
  const datasets = generateProductionDatasets();

  for (const [name, data] of Object.entries(datasets)) {
    saveDataset(name, data, outputDir);
  }

  const manifest = {
    generated_at: new Date().toISOString().replace(".000Z", "Z"),
    datasets: Object.keys(datasets),
    description: "ISA Fabric benchmark datasets for testing and validation"
  };
  saveDataset("manifest", manifest, outputDir);

  console.log(`\nSaved all datasets to ${outputDir}/`);
}

function generateSingle(scenario: ScenarioKey, outputDir: string) {
  const gen = new ISADatasetGeneratorV2();

  let name: string;
  let data: any;

  switch (scenario) {
    case "baseline":
      name = "baseline_normal_7d";
      data = gen.generateScenario("normal", 168, "2026-01-10T00:00:00");
      break;
    case "ddos":
      name = "adversarial_ddos_3d";
      data = gen.generateScenario("ddos", 72, "2026-01-17T00:00:00");
      break;
    case "insider":
      name = "insider_threat_5d";
      data = gen.generateScenario("insider_threat", 120, "2026-01-12T00:00:00");
      break;
    case "supply_chain":
      name = "supply_chain_4d";
      data = gen.generateScenario("supply_chain", 96, "2026-01-13T00:00:00");
      break;
    case "regulatory":
      name = "regulatory_change_10d";
      data = gen.generateScenario("regulatory_change", 240, "2026-01-07T00:00:00");
      break;
    default:
      console.error(`Unknown scenario: ${scenario}`);
      process.exit(1);
  }

  console.log(`Generating scenario: ${scenario} -> ${name}`);
  saveDataset(name, data, outputDir);
}

function stats() {
  const datasets = generateProductionDatasets();

  console.log("Dataset Statistics:");
  console.log("=========================================");

  for (const [name, data] of Object.entries(datasets)) {
    const points = data.total_points;
    const hours = data.hours;
    const domains = new Set(data.time_series.map((e: any) => e.domain));
    const timestamps = data.time_series.map((e: any) => e.timestamp);

    console.log(`\n${name}:`);
    console.log(`  Data points: ${points}`);
    console.log(`  Hours:       ${hours}`);
    console.log(`  Domains:     ${Array.from(domains).join(", ")}`);
    console.log(`  Time range:  ${timestamps[0]} to ${timestamps[timestamps.length - 1]}`);

    const sample = data.time_series[0]?.metrics;
    if (sample) {
      console.log(`  Sample metrics: ${Object.keys(sample).join(", ")}`);
    }
  }
}

function validate() {
  console.log("Dataset validation not yet implemented.");
  console.log("For now, you can run:");
  console.log("  node -e \"JSON.parse(require('fs').readFileSync('file.json','utf8'))\"");
}

function main() {
  const args = parseArgs(process.argv);

  switch (args.command) {
    case "generate":
      if (args.scenario === "all") {
        generateAll(args.output);
      } else {
        generateSingle(args.scenario, args.output);
      }
      break;

    case "list":
      listScenarios();
      break;

    case "info":
      info();
      break;

    case "stats":
      stats();
      break;

    case "validate":
      validate();
      break;

    default:
      console.error(`Unknown command: ${args.command}`);
      info();
      process.exit(1);
  }
}

main();
