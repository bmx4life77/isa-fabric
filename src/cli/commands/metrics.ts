import { Command } from "commander";
import { runMetrics } from "../../engine/metrics";

export function registerMetricsCommands(program: Command) {
  const metrics = program.command("metrics");

  metrics
    .command("evaluate")
    .requiredOption("--domain <domain>")
    .requiredOption("--input <file>")
    .option("--out <file>")
    .action(runMetrics);
}
