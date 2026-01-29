import { Command } from "commander";

export function registerMetricsCommand(program: Command) {
  program
    .command("metrics")
    .description("Metrics commands not yet wired to domain layer")
    .action(() => {
      console.log("Metrics CLI not yet implemented.");
    });
}
