/**
 * ISA Fabric — CLI Engine
 * index.ts
 *
 * Entry point for CLI commands.
 */

import { runComputeCommand } from "./compute";
import { runEvaluateCommand } from "./evaluate";
import { runInspectCommand } from "./inspect";

export function runCLI() {
  const args = process.argv.slice(2);

  const command = args[0];

  if (command === "benchmark") {
  const { runLensBenchmarkCommand } = require("./lens_benchmark");
  runLensBenchmarkCommand();
  return;
}

  // -------------------------
  // COMPUTE
  // -------------------------
  if (command === "compute") {
    const domainFlag = args.indexOf("--domain");
    const inputFlag = args.indexOf("--input");

    if (domainFlag === -1 || inputFlag === -1) {
      console.error(
        "Usage: isa compute --domain <DEX|Bridge> --input <file.json>"
      );
      process.exit(1);
    }

    runComputeCommand({
      domain: args[domainFlag + 1],
      input: args[inputFlag + 1],
    });

    return;
  }

  // -------------------------
  // EVALUATE
  // -------------------------
  if (command === "evaluate") {
    const domainFlag = args.indexOf("--domain");
    const inputFlag = args.indexOf("--input");
    const roleFlag = args.indexOf("--role");

    if (domainFlag === -1 || inputFlag === -1) {
      console.error(
        "Usage: isa evaluate --domain <DEX|Bridge> --input <file.json> [--role <reviewer|steward|emergency>]"
      );
      process.exit(1);
    }

    runEvaluateCommand({
      domain: args[domainFlag + 1],
      input: args[inputFlag + 1],
      role: roleFlag !== -1 ? args[roleFlag + 1] : undefined,
    });

    return;
  }

  // -------------------------
  // INSPECT
  // -------------------------
  if (command === "inspect") {
    const target = args[1];
    runInspectCommand([target]);
    return;
  }

  console.error(`Unknown command: ${command}`);
  console.error("Available commands: compute, evaluate, inspect");
  console.error("Usage: isa inspect <profiles|macro-state|thresholds|lens-profiles|responsibility>");
  process.exit(1);
}
