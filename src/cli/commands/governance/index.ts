import { Command } from "commander";
import { runSecurityScore } from "../../../domain/security";
import { runGcsVerify } from "../../../domain/gcs";

export function registerGovernanceCommand(program: Command) {
  const gov = program
    .command("governance")
    .description("Governance evaluation and thresholds (backed by security + GCS)");

  gov
    .command("evaluate")
    .description("Evaluate governance security posture")
    .action(async (options) => {
      await runSecurityScore(options);
    });

  gov
    .command("thresholds")
    .description("Verify governance calibration thresholds")
    .action(async (options) => {
      await runGcsVerify(options);
    });
}
