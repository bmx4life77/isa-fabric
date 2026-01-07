// src/scripts/generatebenchmark-suite.ts

import hre from "hardhat";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";
import path from "path";

interface BenchmarkEntry {
  contract: string;
  bytecodeSize: number;
  methodCount: number;
}

async function main(hre: HardhatRuntimeEnvironment) {
  console.log("🔧 Generating benchmark suite…");

  const artifactsRoot = path.join(__dirname, "../../artifacts/contracts");

  if (!fs.existsSync(artifactsRoot)) {
    console.error("❌ No artifacts found. Run: npm run compile");
    return;
  }

  const benchmarks: BenchmarkEntry[] = [];

  function walk(directory: string): void {
    const items = fs.readdirSync(directory);

    for (const entry of items) {
      const full = path.join(directory, entry);

      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".json")) {
        const json = JSON.parse(fs.readFileSync(full, "utf8"));

        benchmarks.push({
          contract: json.contractName ?? "UnknownContract",
          bytecodeSize: json.deployedBytecode?.length ?? 0,
          methodCount: Array.isArray(json.abi) ? json.abi.length : 0
        });
      }
    }
  }

  walk(artifactsRoot);

  const outDir = path.join(__dirname, "../../benchmark");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const outFile = path.join(outDir, "benchmark-suite.json");

  fs.writeFileSync(outFile, JSON.stringify(benchmarks, null, 2));

  console.log("✅ Benchmark suite written:");
  console.log("   → benchmark/benchmark-suite.json");
}

main(hre).catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
