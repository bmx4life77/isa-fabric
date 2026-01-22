import { Command } from "commander";

import { registerIsoCommand } from "./commands/iso";
import { registerBenchmarkCommand } from "./commands/benchmark";
import { registerTagCommand } from "./commands/tags";
import { registerAdversarialCommand } from "./commands/adversarial";
import { registerSecurityCommand } from "./commands/security";
import { registerGcsCommand } from "./commands/gcs";
import { registerInspectCommand } from "./commands/inspect";
import { registerGovernanceCommands } from "./commands/governance";
import { registerMetricsCommands } from "./commands/metrics";
import { registerDeployCommands } from "./commands/deploy";
import { registerEvaluateCommand } from "./commands/evaluate";
import { registerThetaCommand } from "./commands/forecast/theta";

import { 
  ISADatasetGeneratorV2, 
  generateProductionDatasets 
} from "../tools/datasets/datasetGeneratorV2";

export function buildCLI() {
  const program = new Command();

  program
    .name("isa")
    .description("ISA Metrics unified CLI")
    .version("0.2.0");

  // ------------------------------------------------------------
  // DATASETS COMMAND GROUP
  // ------------------------------------------------------------
  program
    .command("datasets")
    .description("Generate and inspect ISA Fabric synthetic datasets")
    .option("-s, --scenario <name>", "Scenario to generate (baseline, ddos, insider, supply_chain, regulatory, all)", "all")
    .option("-o, --output <dir>", "Output directory for generated datasets", "datasets/generated")
    .option("--stats", "Show dataset statistics instead of generating")
    .option("--list", "List available scenarios")
    .action(async (options) => {
      const { scenario, output, stats, list } = options;

      if (list) {
        console.log("Available scenarios:");
        console.log("  baseline     - Normal operation (7 days)");
        console.log("  ddos         - DDoS attack scenario (3 days)");
        console.log("  insider      - Insider threat (5 days)");
        console.log("  supply_chain - Supply chain disruption (4 days)");
        console.log("  regulatory   - Regulatory change impact (10 days)");
        console.log("  all          - All scenarios");
        return;
      }

      if (stats) {
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
        return;
      }

      const fs = await import("fs");
      const path = await import("path");

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

      const gen = new ISADatasetGeneratorV2();

      if (scenario === "all") {
        console.log("Generating all production datasets...");
        const datasets = generateProductionDatasets();

        for (const [name, data] of Object.entries(datasets)) {
          saveDataset(name, data, output);
        }

        const manifest = {
          generated_at: new Date().toISOString().replace(".000Z", "Z"),
          datasets: Object.keys(datasets),
          description: "ISA Fabric benchmark datasets for testing and validation"
        };
        saveDataset("manifest", manifest, output);

        console.log(`\nSaved all datasets to ${output}/`);
        return;
      }

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

      console.log(`Generating scenario: ${scenario} → ${name}`);
      saveDataset(name, data, output);
    });

  // ------------------------------------------------------------
  // EXISTING COMMAND GROUPS
  // ------------------------------------------------------------
  registerIsoCommand(program);
  registerBenchmarkCommand(program);
  registerTagCommand(program);
  registerAdversarialCommand(program);
  registerSecurityCommand(program);
  registerGcsCommand(program);
  registerInspectCommand(program);
  registerGovernanceCommands(program);
  registerMetricsCommands(program);
  registerDeployCommands(program);
  registerEvaluateCommand(program);
  registerThetaCommand(program);

  return program;
}
