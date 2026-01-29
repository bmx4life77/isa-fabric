import { Command } from "commander";
import {
  runIsoCompute,
  runIsoAlign,
  runIsoReport
} from "../../../domain/iso";

export function registerIsoCommand(program: Command) {
  const iso = program
    .command("iso")
    .description("ISO-style tiering, alignment, and reporting");

  iso
    .command("compute")
    .description("Compute ISO tier")
    .action(async (options) => {
      await runIsoCompute(options);
    });

  iso
    .command("align")
    .description("Align metrics to ISO framework")
    .action(async (options) => {
      await runIsoAlign(options);
    });

  iso
    .command("report")
    .description("Generate ISO alignment report")
    .action(async (options) => {
      await runIsoReport(options);
    });
}
