import { Command } from "commander";
import fs from "fs";
import path from "path";

export function registerInspectCommand(program: Command) {
  program
    .command("inspect <file>")
    .description("Inspect an ISA envelope file")
    .action(async (file) => {
      try {
        const fullPath = path.resolve(process.cwd(), file);
        const raw = await fs.promises.readFile(fullPath, "utf8");
        const envelope = JSON.parse(raw);

        console.log("Envelope Inspection:");
        console.log("--------------------");

        console.log(`Version: ${envelope.version}`);
        console.log(`Domain:  ${envelope.domain}`);
        console.log(`Name:    ${envelope.name}`);
        console.log("");

        console.log("Metrics:");
        console.log(JSON.stringify(envelope.metrics, null, 2));
        console.log("");

        console.log("Insights:");
        envelope.insights?.forEach((i: string) => console.log(`- ${i}`));
        console.log("");

        console.log("Input Summary:");
        console.log(`Point Count: ${envelope.input?.pointCount}`);
        console.log(
          `Time Range:  ${envelope.input?.timeRange?.start} → ${envelope.input?.timeRange?.end}`
        );
      } catch (err) {
        console.error("Failed to inspect envelope:");
        console.error(err);
      }
    });
}
