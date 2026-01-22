import { Command } from "commander";
import { runFullPipeline } from "../../engine/pipeline";

export function registerEvaluateCommand(program: Command) {
  program
    .command("evaluate")
    .requiredOption("--domain <domain>")
    .requiredOption("--input <file>")
    .option("--out <file>")
    .action(runFullPipeline);
}
