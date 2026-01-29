import { Command } from "commander";
import { runInspect } from "../../../domain/inspect";

export function registerInspectCommand(program: Command) {
  program
    .command("inspect")
    .description("Inspect artifacts or envelopes (placeholder)")
    .action(async (options) => {
      await runInspect(options);
    });
}
