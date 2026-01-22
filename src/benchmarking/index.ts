// src/benchmarking/index.ts
import fs from "fs";
import path from "path";
import { parseDataset } from "./schema";
import { computeLensScores } from "./metrics";
import { generateInsights } from "./insights";
import { buildEnvelope, type Envelope } from "./envelope";

export type BenchmarkOptions = {
  profile?: string; // reserved for future domain-specific behavior
  outputPath?: string;
};

export function runBenchmark(
  inputPath: string,
  options: BenchmarkOptions = {}
): Envelope {
  const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const dataset = parseDataset(raw);
  const scores = computeLensScores(dataset);
  const insights = generateInsights(scores);
  const envelope = buildEnvelope(dataset, scores, insights);

  const outDir = options.outputPath
    ? path.dirname(options.outputPath)
    : path.dirname(inputPath);

  const outName =
    options.outputPath ??
    path.join(outDir, `${path.basename(inputPath, ".json")}.envelope.json`);

  fs.writeFileSync(outName, JSON.stringify(envelope, null, 2), "utf8");

  return envelope;
}
