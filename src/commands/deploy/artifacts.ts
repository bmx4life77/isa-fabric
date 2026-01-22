import { Command } from "commander";
import { fileExists, loadJson, validateSchema } from "./internal/validate";
import { deployArtifact } from "./internal/engine";
import { ArtifactSchema } from "./internal/schemas/artifact";

export default function artifact() {
  const cmd = new Command("artifact")
    .argument("<file>", "Artifact file to deploy")
    .description("Deploy a generic ISA artifact (scores, insights, reports)")
    .option("--type <kind>", "Artifact type (auto|score|insight|report)", "auto")
    .option("--target <env>", "Deployment environment")
    .action(async (file, options) => {
      if (!fileExists(file)) {
        console.error("Error: Artifact file not found");
        return;
      }

      const raw = loadJson(file);

      let artifact;
      try {
        artifact = validateSchema(ArtifactSchema, raw);
      } catch (err: any) {
        console.error("Artifact validation failed");
        console.error(err.message);
        return;
      }

      const result = await deployArtifact(artifact, {
        target: options.target,
        type: options.type
      });

      console.log(result.message);
      console.log(result.details);
    });

  return cmd;
}
