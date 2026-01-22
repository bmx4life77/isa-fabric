import { Command } from "commander";
import { fileExists, loadJson, validateSchema } from "./internal/validate";
import { deployArtifact } from "./internal/engine";
import { ModelSchema } from "./internal/schemas/model";

export default function model() {
  const cmd = new Command("model")
    .argument("<file>", "Model file to deploy")
    .description("Deploy a trained RL or forecasting model")
    .option("--type <kind>", "Model type (rl|forecast)", "rl")
    .option("--shadow", "Deploy in shadow mode (observe only)")
    .option("--target <env>", "Deployment environment (local|staging|production)")
    .action(async (file, options) => {
      if (!fileExists(file)) {
        console.error("Error: Model file not found");
        return;
      }

      const raw = loadJson(file);

      let model;
      try {
        model = validateSchema(ModelSchema, raw);
      } catch (err: any) {
        console.error("Model validation failed");
        console.error(err.message);
        return;
      }

      const result = await deployArtifact(model, {
        target: options.target,
        shadow: options.shadow,
        type: options.type
      });

      console.log(result.message);
      console.log(result.details);
    });

  return cmd;
}
