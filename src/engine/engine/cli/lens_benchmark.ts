import { runLensBenchmark } from "../benchmark/lens_benchmark";

export function runLensBenchmarkCommand() {
  const results = runLensBenchmark();
  console.log("ISA Lens Benchmark Results:");
  console.log(JSON.stringify(results, null, 2));
}
