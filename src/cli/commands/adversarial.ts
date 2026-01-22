// src/cli/commands/adversarial.ts

import { runAdversarialSimulation } from "../../core/adversarial/adversarial";
import { AdversarialInput, AdversarialResult } from "../../core/adversarial/types";
import { Command } from "commander";
import path from "path";
import fs from "fs";

/**
 * Register adversarial engine commands for the ISA CLI.
 *
 * This provides:
 *   isa adversarial run <file>
 *   isa adversarial inspect <file>
 *
 * The adversarial engine is responsible for:
 * - divergence detection
 * - attack vector simulation
 * - executor‑based adversarial tasks
 * - sensitivity sweeps
 * - state divergence analysis
 */
export function registerAdversarialCommand(program: Command) {
  const adversarial = program
    .command("adversarial")
    .description("Adversarial engine: divergence, attack vectors, and simulations");

  /**
   * Run a full adversarial simulation
   */
  adversarial
    .command("run")
    .description("Run an adversarial simulation using a JSON input file")
    .argument("<file>", "Path to adversarial input JSON")
    .action((file) => {
      const resolved = path.resolve(process.cwd(), file);
      const raw = fs.readFileSync(resolved, "utf8");
      const data = JSON.parse(raw) as AdversarialInput;

      const result: AdversarialResult = runAdversarialSimulation(data);

      console.log(JSON.stringify(result, null, 2));
    });

  /**
   * Inspect an adversarial input file without running it
   */
  adversarial
    .command("inspect")
    .description("Inspect an adversarial input JSON file")
    .argument("<file>", "Path to adversarial input JSON")
    .action((file) => {
      const resolved = path.resolve(process.cwd(), file);
      const raw = fs.readFileSync(resolved, "utf8");
      const data = JSON.parse(raw);

      console.log("Adversarial Input File:");
      console.log(JSON.stringify(data, null, 2));
    });
}
