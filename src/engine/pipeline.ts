import fs from "fs";
import path from "path";
import { computeMetrics } from "../core/metrics/computeMetrics";
import { modulate } from "../core/modulation/modulate";
import { evaluateGovernance } from "../core/governance/evaluate";
import { writeEnvelope } from "./utils/envelope";

export async function runFullPipeline(opts: any) {
  const inputPath = path.resolve(opts.input);
  const telemetry = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  const raw = computeMetrics({
    domain: opts.domain,
    telemetry
  });

  const modulated = modulate({
    domain: opts.domain,
    metrics: raw
  });

  const governance = evaluateGovernance({
    domain: opts.domain,
    metrics: modulated
  });

  const envelope = {
    raw,
    modulated,
    governance,
    timestamp: new Date().toISOString()
  };

  if (opts.out) {
    writeEnvelope(opts.out, envelope);
  }

  console.log(JSON.stringify(envelope, null, 2));
}
