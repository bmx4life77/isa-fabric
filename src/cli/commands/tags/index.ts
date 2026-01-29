import { Command } from "commander";
import { runSecurityReport } from "../../../domain/security";

export function registerTagsCommand(program: Command) {
  program
    .command("tags:report")
    .description("Generate a security/tagging report (placeholder wiring)")
    .action(async (options) => {
      await runSecurityReport(options);
    });
}
