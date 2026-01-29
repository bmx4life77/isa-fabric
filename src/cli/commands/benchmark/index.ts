// src/cli/commands/benchmark/index.ts
import { Command } from "commander";
import { runBenchmark } from "../../../benchmarking";

export function registerBenchmarkCommand(program: Command) {
  program
    .command("benchmark")
    .description("Run ISA Fabric benchmarking on an input dataset")
    .requiredOption("-i, --input <path>", "Path to input JSON dataset")
    .option("-o, --output <path>", "Optional output path for envelope JSON")
    .action((options) => {
      const inputPath = options.input as string;
      const outputPath = options.output as string | undefined;

      runBenchmark(inputPath, { outputPath });
    });
}

