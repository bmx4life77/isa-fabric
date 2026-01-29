import { Command } from "commander";
import {
  runSecurityMap,
  runSecurityScore,
  runSecurityReport
} from "../../../domain/security";

export function registerSecurityCommand(program: Command) {
  const security = program
    .command("security")
    .description("Security framework mapping, scoring, and reporting");

  security
    .command("map")
    .description("Map metrics to a security framework")
    .action(async (options) => {
      await runSecurityMap(options);
    });

  security
    .command("score")
    .description("Compute security score")
    .action(async (options) => {
      await runSecurityScore(options);
    });

  security
    .command("report")
    .description("Generate security report")
    .action(async (options) => {
      await runSecurityReport(options);
    });
}
