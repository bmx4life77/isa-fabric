// src/tools/advRunner.ts
import {
  runCalibrationForExecutors,
} from "../calibration/CalibrationLoop";
import { CalibrationConfig } from "../calibration/CalibrationTypes";

import { Executor } from "../executors/Executor";
import { IsaFabricExecutor } from "../executors/IsaFabricExecutor";
import { SolanaStyleExecutor } from "../executors/SolanaStyleExecutor";
import { AptosStyleExecutor } from "../executors/AptosStyleExecutor";
import { SuiStyleExecutor } from "../executors/SuiStyleExecutor";
import { generateWorkload } from "../workloads/workloadGenerator";

const executors: Executor[] = [
  new IsaFabricExecutor(),
  new SolanaStyleExecutor(),
  new AptosStyleExecutor(),
  new SuiStyleExecutor(),
];

function main() {
  const model = process.argv[2] ?? "dex";
  const ops = Number(process.argv[3] ?? "5000");

  // Old CLI-only behavior: single shard param (optional)
  const singleShard = Number(process.argv[4] ?? "8");

  console.log(`\n🔬 Adversarial macro comparison`);
  console.log(`   model=${model}, ops=${ops}, shards=${singleShard}\n`);

  for (const ex of executors) {
    const { wallTimeMs, vectorizationUtilization, throughput } = ex.execute(
      ops,
      singleShard
    );

    console.log(`→ ${ex.name} [${ex.kind}]`);
    console.log(
      `   wallTimeMs=${wallTimeMs.toFixed(2)} ms, ` +
        `util=${vectorizationUtilization.toFixed(4)}, ` +
        `throughput=${throughput.toFixed(2)} ops/sec\n`
    );
  }

  // NEW: Full calibration sweep over Option C shard profile
  const shardProfile = [8, 16, 24, 32, 48, 64, 96, 128];

  const cfg: CalibrationConfig = {
    model,
    ops,
    shardProfile,
    thresholds: {
      minScalableVU: 0.98,
      betaSaturationThreshold: 0.95,
      minStabilityIndex: 0.90,
    },
  };

  const { summary } = runCalibrationForExecutors(executors, cfg);

  console.log("\n📊 Calibration Summary (Four Pillars)");
  console.log(
    `   Model=${summary.model}, ops=${summary.ops}, shards=${summary.shardProfile.join(
      ","
    )}`
  );

  console.log(
    `   Scalability (VU>=${cfg.thresholds.minScalableVU}): ${
      summary.scalability.ok ? "OK" : "⚠ NOT OK"
    }`
  );
  console.log(
    `   Saturation (β<${summary.saturation.betaThreshold}): ${
      summary.saturation.saturationShard ?? "none (not reached)"
    }`
  );
  console.log(
    `   Temporal Stability (SI>=${cfg.thresholds.minStabilityIndex}): ${
      summary.temporalStability.ok ? "OK" : "⚠ NOT OK"
    }`
  );
  console.log(
    `   Correctness (ISA vs baseline): ${
      summary.correctness.isaMaintainsCorrectness === "unknown"
        ? "unknown (needs stateValid wiring)"
        : summary.correctness.isaMaintainsCorrectness
        ? "ISA maintained correctness while baseline failed"
        : "no observed advantage yet"
    }`
  );
}

if (require.main === module) {
  main();
}
