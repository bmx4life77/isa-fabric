import { Command } from "commander";
import {
  runAdversarialSim,
  runAdversarialVector,
  runAdversarialStress
} from "../../../domain/adversarial";

export function registerAdversarialCommand(program: Command) {
  const adv = program
    .command("adversarial")
    .description("Adversarial scenarios, vectors, and stress tests");

  adv
    .command("simulate")
    .description("Simulate adversarial scenario")
    .action(async (options) => {
      await runAdversarialSim(options);
    });

  adv
    .command("vectors")
    .description("Analyze adversarial vectors")
    .action(async (options) => {
      await runAdversarialVector(options);
    });

  adv
    .command("stress")
    .description("Run adversarial stress test")
    .action(async (options) => {
      await runAdversarialStress(options);
    });
}
