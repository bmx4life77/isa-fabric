import fs from "fs";
import path from "path";
import { computeMetrics } from "../core/metrics/computeMetrics"; 
import { writeEnvelope } from "./utils/envelope";

export async function runMetrics(opts: any) {
  const inputPath = path.resolve(opts.input);
  const telemetry = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  const result = computeMetrics({
    domain: opts.domain,
    telemetry
  });

  if (opts.out) {
    writeEnvelope(opts.out, result);
  }

  console.log(JSON.stringify(result, null, 2));
}
