// src/fre/freCli.ts
import fs from "fs";
import path from "path";
import { runFRE } from "./engine";
import { toUiPayload } from "./uiAdapter";
import type { FREReport, ShockSpec, ShockMode } from "./types";

function parseShock(argv: string[]): ShockSpec | undefined {
  const idx = argv.indexOf("--shock");
  if (idx === -1) return undefined;
  const modeStr = argv[idx + 1];
  // Coerce CLI string to ShockMode when possible; keep as string otherwise
  const mode = (modeStr as unknown) as ShockMode;
  return { mode };
}

async function main() {
  const file = process.argv[2] ?? "data/aggregated_metrics3_2.json";
  const emitEvents = process.argv.includes("--events");
  const outIndex = process.argv.indexOf("--out");
  const outFile = outIndex > -1 ? process.argv[outIndex + 1] : undefined;
  const useUi = process.argv.includes("--ui");
  const shockSpec = parseShock(process.argv);

  const report: FREReport = await runFRE({ file, emitEvents, shockSpec });

  if (outFile) {
    const dir = path.dirname(outFile);
    if (dir && dir !== "." && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
    console.log(`Wrote FRE report -> ${outFile}`);
  }

  if (useUi) {
    const decisionConfidence =
      report.forecast?.composite?.confidence ??
      (Array.isArray(report.diagnostics?.regimes)
        ? Math.min(0.95, report.diagnostics.regimes.length / 10)
        : 0.5);
    const ui = toUiPayload(report, decisionConfidence);
    console.log(JSON.stringify(ui, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
}

main().catch(err => {
  console.error("FRE CLI failed:", err);
  process.exit(1);
});
