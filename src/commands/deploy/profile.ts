import { Command } from "commander";
import { fileExists, loadJson, validateSchema } from "./internal/validate";
import { deployArtifact } from "./internal/engine";
import { ProfileSchema } from "./internal/schemas/profile";

export default function profile() {
  const cmd = new Command("profile")
    .argument("<name>", "Domain profile name (e.g., finance/dex)")
    .description("Deploy or activate a domain profile")
    .option("--activate", "Activate this profile as the default for its domain")
    .option("--version <v>", "Specify a version tag for deployment")
    .option("--rollback <v>", "Roll back to a previous version")
    .option("--dry-run", "Validate deployment without executing it")
    .action(async (file, options) => {
      if (!fileExists(file)) {
        console.error("Error: Profile file not found");
        return;
      }

      const raw = loadJson(file);

      let profile;
      try {
        profile = validateSchema(ProfileSchema, raw);
      } catch (err: any) {
        console.error("Profile validation failed");
        console.error(err.message);
        return;
      }

      const result = await deployArtifact(profile, {
        target: options.target,
        dryRun: options.dryRun,
        version: options.version
      });

      console.log(result.message);
      console.log(result.details);
    });

  return cmd;
}
