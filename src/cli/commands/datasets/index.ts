// src/cli/commands/datasets/index.ts
import { Command } from "commander";
import { generateProductionDatasets } from "../../../tools/datasets/datasetGeneratorV2";
import fs from "fs";
import path from "path";

export function registerDatasetsCommand(program: Command) {
  program
    .command("datasets:generate")
    .description("Generate ISA Fabric production datasets (JSON)")
    .requiredOption("-o, --output-dir <path>", "Output directory for generated datasets")
    .action((options) => {
      const outDir = options.outputDir as string;
      const datasets = generateProductionDatasets();

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      for (const [name, data] of Object.entries(datasets)) {
        const outPath = path.join(outDir, `${name}.json`);
        fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
      }

      console.log(`Generated ${Object.keys(datasets).length} datasets into ${outDir}`);
    });
}
