// src/cli/commands/gcs.ts
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { runGcsCalibration, GcsFile } from "../../core/gcs/runner";

export function registerGcsCommand(program: Command) {
  const gcs = program
    .command("gcs")
    .description("Golden Calibration Series tools");

  gcs
    .command("run")
    .description("Run GCS calibration against a scenario file")
    .argument(
      "<file>",
      "JSON file containing ISA GCS scenarios (e.g., data/calibration/isa-gcs-v0.1.json)"
    )
    .option(
      "--tolerance <tol>",
      "Numeric tolerance for deviations (default 0.005)",
      "0.005"
    )
    .option(
      "--alpha-psi5 <alpha>",
      "Exponent for ψ₅ modifier in Cyber Index (default 0.0)",
      "0.0"
    )
    .action((file, options) => {
      const resolved = path.resolve(process.cwd(), file);
      const raw = fs.readFileSync(resolved, "utf8");
      const data = JSON.parse(raw) as GcsFile;

      const tolerance = parseFloat(options.tolerance);
      const alphaPsi5 = parseFloat(options.alphaPsi5);

      const result = runGcsCalibration(data, tolerance, alphaPsi5);

      console.log(
        JSON.stringify(
          {
            version: result.version,
            total: result.total,
            passed: result.passed,
            failed: result.failed,
            scenarios: result.scenarioResults,
          },
          null,
          2
        )
      );
    });
}
