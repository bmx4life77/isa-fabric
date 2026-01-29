import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface BenchmarkScenario {
  name: string;
  psi5: number;
  SE: number;
  drift: number;
  volatility: number;
}

export function loadBenchmarkScenarios(): BenchmarkScenario[] {
  const filePath = path.join(
    process.cwd(),
    "schemas",
    "benchmark",
    "isa-benchmark-scenarios.yaml"
  );

  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(file) as { scenarios: BenchmarkScenario[] };

  return data.scenarios;
}
