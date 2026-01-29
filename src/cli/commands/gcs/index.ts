import { Command } from "commander";
import { runGcsCalibrate, runGcsVerify } from "../../../domain/gcs";

export function registerGcsCommand(program: Command) {
  const gcs = program
    .command("gcs")
    .description("GCS calibration and verification");

  gcs
    .command("calibrate")
    .description("Run GCS calibration")
    .action(async (options) => {
      await runGcsCalibrate(options);
    });

  gcs
    .command("verify")
    .description("Verify GCS calibration")
    .action(async (options) => {
      await runGcsVerify(options);
    });
}
