import fs from "fs";
import path from "path";
import { artifacts } from "hardhat";

export async function main(hre: any) {
  console.log("→ Generating tag metadata...");

  const outPath = path.join("dist", "method-tags.json");
  const output: any[] = [];

  for (const full of await artifacts.getArtifactPaths()) {
    const artifact = JSON.parse(fs.readFileSync(full, "utf8"));
    if (!artifact.abi) continue;

    for (const item of artifact.abi) {
      if (item.type === "function") {
        const sig = `${item.name}(${item.inputs.map(i => i.type).join(",")})`;
        const selector = hre.ethers.id(sig).slice(0, 10);

        output.push({
          name: item.name,
          signature: sig,
          selector,
          tags: []
        });
      }
    }
  }

  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log("✔ Method tag metadata created");
}
