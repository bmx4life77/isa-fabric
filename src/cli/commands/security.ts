// src/cli/commands/security.ts

import { Command } from "commander";
import fs from "fs";
import path from "path";

// Correct imports
import { computeMitreCoverageIndex, MitreInput } from "../../core/security/mitreAttck";
import {
  computeCisControlsIndex,
  CisControlsInput,
  CisControlsResult,
} from "../../core/security/cisControls";

export function registerSecurityCommand(program: Command) {
  const security = program
    .command("security")
    .description("Security framework compatibility (CIS, MITRE, ISO, NIST, etc.)");

  // ------------------------------------------------------------
  // CIS Controls v8
  // ------------------------------------------------------------
  security
    .command("cis")
    .description("Compute CIS Controls v8 compliance index")
    .argument("<file>", "JSON file with 18 control scores (1–18)")
    .action((file) => {
      const resolved = path.resolve(process.cwd(), file);
      const raw = fs.readFileSync(resolved, "utf8");
      const data = JSON.parse(raw);

      if (!data.controls) {
        throw new Error("Expected object with `controls` field (1–18).");
      }

      // Build CIS input object
      const controls = data.controls as Record<string, number>;

      const cisInput: CisControlsInput = {
        stateSurface: controls["3"] ?? 0.8, // You can adjust this mapping later
        psi5: controls["14"] ?? 0.9,
      };

      const result: CisControlsResult = computeCisControlsIndex(cisInput);
      console.log(JSON.stringify(result, null, 2));
    });

  // ------------------------------------------------------------
  // MITRE ATT&CK
  // ------------------------------------------------------------
  security
    .command("mitre")
    .description("Compute MITRE ATT&CK coverage index over the 14 tactics")
    .argument("<file>", "JSON file with tactic scores")
    .action((file) => {
      const resolved = path.resolve(process.cwd(), file);
      const raw = fs.readFileSync(resolved, "utf8");
      const data = JSON.parse(raw);

      if (!data.tactics) {
        throw new Error("Expected object with `tactics` field.");
      }

      const t = data.tactics as Record<string, number>;

      const mitreInput: MitreInput = {
        tactics: {
          reconnaissance: t["reconnaissance"],
          resourceDevelopment: t["resourceDevelopment"],
          initialAccess: t["initialAccess"],
          execution: t["execution"],
          persistence: t["persistence"],
          privilegeEscalation: t["privilegeEscalation"],
          defenseEvasion: t["defenseEvasion"],
          credentialAccess: t["credentialAccess"],
          discovery: t["discovery"],
          lateralMovement: t["lateralMovement"],
          collection: t["collection"],
          commandAndControl: t["commandAndControl"],
          exfiltration: t["exfiltration"],
          impact: t["impact"],
        },
      };

      const result = computeMitreCoverageIndex(mitreInput);
      console.log(JSON.stringify(result, null, 2));
    });
}
