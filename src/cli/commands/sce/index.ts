// src/cli/commands/sce/index.ts

import { Command } from "commander";
import {
  runGcsCalibrate,
  runGcsVerify
} from "../../../domain/gcs";

/**
 * Register the SCE (Spec Compliance Engine) commands.
 * Backed by the GCS (Governance Calibration System) domain layer.
 */
export function registerSceCommand(program: Command) {
  const sce = program
    .command("sce")
    .description("Spec Compliance Engine (GCS-backed calibration & verification)");

  // -----------------------------
  // SCE: Calibrate
  // -----------------------------
  sce
    .command("calibrate")
    .description("Run GCS calibration process")
    .requiredOption("-i, --input <path>", "Input artifact or dataset")
    .action(async (options) => {
      await runGcsCalibrate(options);
    });

  // -----------------------------
  // SCE: Verify
  // -----------------------------
  sce
    .command("verify")
    .description("Verify GCS calibration thresholds")
    .requiredOption("-i, --input <path>", "Input artifact or dataset")
    .action(async (options) => {
      await runGcsVerify(options);
    });
}
