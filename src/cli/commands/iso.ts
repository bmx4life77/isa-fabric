// src/cli/commands/iso.ts
import { Command } from "commander";
import fs from "fs";
import { isoScore, RasuvVector } from "../../core/iso/isaIso";

export function registerIsoCommand(program: Command) {
  const iso = program
    .command("iso")
    .description("ISO alignment, compliance scoring, and tier computation");

  iso
    .command("score")
    .argument("<file>", "Input JSON file with RASUV")
    .requiredOption("-d, --domain <domain>", "Domain: manufacturing | aerospace")
    .action((file, options) => {
      const raw = fs.readFileSync(file, "utf8");
      const data = JSON.parse(raw);
      const rasuv: RasuvVector = data.RASUV;

      if (!rasuv) {
        throw new Error("Missing 'RASUV' in input file");
      }

      const result = isoScore(rasuv, options.domain);
      console.log(JSON.stringify(result, null, 2));
    });
}
