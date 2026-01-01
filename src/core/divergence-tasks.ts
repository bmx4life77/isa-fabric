import { task } from "hardhat/config";


task("benchmark:divergence", "Run divergence detection across engines")
  .addOptionalParam("ops", "Number of ops", "2000")
  .addOptionalParam("shards", "Shard count", "4")
  .setAction(async ({ ops, shards }) => {
    const { spawnSync } = require("child_process");

    const res = spawnSync("node", [  
      ops,
      shards
    ], {
      stdio: "inherit"
    });

    process.exit(res.status ?? 0);
  });
