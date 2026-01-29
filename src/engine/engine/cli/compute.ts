/**
 * ISA Fabric — CLI Engine
 * compute.ts
 *
 * Runs the metrics engine only.
 */

import fs from "fs";
import path from "path";

import { computeMetrics } from "../metrics/compute";

export function runComputeCommand(args: { domain: string; input: string }) {
  const inputPath = path.resolve(args.input);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const telemetry = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  const metrics = computeMetrics(telemetry, { name: args.domain });

  console.log("ISA Metrics Output:");
  console.log(JSON.stringify(metrics, null, 2));
}
