import { Command } from "commander";
import { fileExists, loadJson, validateSchema } from "./internal/validate";
import { deployArtifact } from "./internal/engine";
import { EnvelopeSchema } from "./internal/schemas/envelope";

export default function envelope() {
  const cmd = new Command("envelope")
    .argument("<file>", "Envelope file to deploy")
    .description("Deploy an ISA Envelope to a target environment")
    .option("--to <endpoint>", "Deployment target (API, S3, IPFS, registry)")
    .option("--sign", "Sign the envelope before deployment")
    .option("--metadata <file>", "Attach metadata JSON file")
    .option("--dry-run", "Validate deployment without executing it")
    .action(async (file, options) => {
      if (!fileExists(file)) {
        console.error("Error: Envelope file not found");
        return;
      }

      // Load raw JSON
      const raw = loadJson(file);

      // Validate against schema
      let envelope;
      try {
        envelope = validateSchema(EnvelopeSchema, raw);
      } catch (err: any) {
        console.error("Envelope validation failed");
        console.error(err.message);
        return;
      }

      // Call internal deploy engine
      const result = await deployArtifact(envelope, {
        target: options.to,
        dryRun: options.dryRun,
        metadata: options.metadata
      });

      console.log(result.message);
      console.log(result.details);
    });

  return cmd;
}
