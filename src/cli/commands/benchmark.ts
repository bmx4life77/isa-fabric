import { Command } from "commander";
import fs from "fs";
import { runBenchmark } from "../../benchmarking";

import { validateTelemetry } from "../../core/validation";
import { buildEnvelope } from "../../core/envelope";
import { computeScores } from "../../core/scoring";
import { generateReport } from "../../core/reporting";
import { generateInsights } from "../../core/insights";
import { generateNarrative } from "../../core/narrative";
import { loadProfile } from "../../core/profiles";

export function registerBenchmarkCommand(program: Command) {
  const benchmark = program
    .command("benchmark")
    .description("Run ISA Metrics benchmarking and related utilities");

  // -------------------------------
  // benchmark run <file>
  // -------------------------------
  benchmark
    .command("run <dataset>") 
    .description("Run a benchmark dataset and produce an envelope") 
    .option("-o, --out <file>", "Write envelope to a file") 
    .action(async (dataset, options) => { 
      try { 
        const envelope = await runBenchmark(dataset); 

        console.log("Benchmark complete. Envelope created:"); 
        console.log(JSON.stringify(envelope, null, 2)); 

        if (options.out) { await fs.promises.writeFile(options.out, JSON.stringify(envelope, null, 2)); 
        console.log(`Envelope written to ${options.out}`); 
        } 
      } catch (err) { 
        console.error("Benchmark failed:"); 
        console.error(err); 
      } 
    });

  // -------------------------------
  // benchmark validate-telemetry <file>
  // -------------------------------
  benchmark
    .command("validate-telemetry <file>")
    .description("Validate raw telemetry against telemetry.schema.json")
    .action((file) => {
      console.log(`Validating telemetry: ${file}`);
      validateTelemetry(file);
      console.log("Telemetry is valid against telemetry.schema.json");
    });

  // -------------------------------
  // benchmark envelope <file>
  // -------------------------------
  benchmark
    .command("envelope <file>")
    .description("Transform raw telemetry into an ISA Envelope")
    .action((file) => {
      const telemetry = validateTelemetry(file);
      const envelope = buildEnvelope(telemetry);
      console.log("Envelope:", envelope);
    });

  // -------------------------------
  // benchmark score <file>
  // -------------------------------
  benchmark
    .command("score <file>")
    .description("Compute ISA Metrics scores from an envelope file")
    .option("--profile <name>", "Domain profile to use for scoring")
    .action((file, options) => {
      console.log(`Computing ISA scores from: ${file}`);

      const envelope = JSON.parse(fs.readFileSync(file, "utf8"));
      const profile = loadProfile(options.profile);
      const scores = computeScores(envelope, profile.weights);

      console.log("Scoring completed.");
      console.log(`Profile used: ${profile.name}`);

      const insights = generateInsights(envelope, scores);
      const narrative = generateNarrative(insights, scores);

      console.log("Scores:", scores);
      console.log("Insights:", insights);
      console.log("Narrative:", narrative);
    });

  // -------------------------------
  // benchmark report <file> --out <path>
  // -------------------------------
  benchmark
    .command("report <file>")
    .description("Generate a benchmark report from a scoring file")
    .option("--out <path>", "Output file path", "benchmark_report.json")
    .action((file, options) => {
      console.log(`Generating report from: ${file}`);
      console.log(`Output path: ${options.out}`);

      const scores = JSON.parse(fs.readFileSync(file, "utf8"));
      const report = generateReport(scores);
      fs.writeFileSync(options.out, JSON.stringify(report, null, 2));

      console.log(`Report written to ${options.out}`);
    });
}
