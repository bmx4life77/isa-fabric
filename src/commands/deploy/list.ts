import { Command } from "commander";
import fs from "fs";
import path from "path";

export default function list() {
  return new Command("list")
    .description("List all deployed artifacts in the local registry")
    .action(() => {
      const root = ".isa/deployments";
      const types = ["envelopes", "profiles", "models", "artifacts"];

      if (!fs.existsSync(root)) {
        console.log("No deployments found.");
        return;
      }

      for (const t of types) {
        const dir = path.join(root, t);
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

        console.log(`\n${t}:`);
        if (files.length === 0) {
          console.log("  (none)");
        } else {
          files.forEach(f => console.log(`  - ${f.replace(".json", "")}`));
        }
      }
    });
}
