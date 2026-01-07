// scripts/checkFreSnapshot.ts
import fs from "node:fs";
import path from "node:path";

const CURRENT = process.argv[2] ?? "data/fre_report.json";
const GOLDEN  = process.argv[3] ?? "golden/fre/agg3_2.json";

function readJson(p: string) {
  const s = fs.readFileSync(p, "utf-8");
  return JSON.parse(s);
}

function keys(o: any): string[] {
  return Object.keys(o).sort();
}

function fail(msg: string): never {
  console.error(`[FRE SNAPSHOT] ${msg}`);
  process.exit(1);
}

function ok(msg: string) {
  console.log(`[FRE SNAPSHOT] ${msg}`);
}

(function main() {
  if (!fs.existsSync(CURRENT)) fail(`Current report not found: ${CURRENT}`);
  if (!fs.existsSync(GOLDEN))  fail(`Golden snapshot not found: ${GOLDEN}`);

  const cur = readJson(CURRENT);
  const gld = readJson(GOLDEN);

  const curTop = keys(cur);
  const gldTop = keys(gld);

  if (JSON.stringify(curTop) !== JSON.stringify(gldTop)) {
    console.log("Current keys:", curTop);
    console.log("Golden  keys:", gldTop);
    fail("Top-level keys differ from golden snapshot.");
  }

  // Light additional checks (optional)
  for (const field of ["version","input","diagnostics","forecast"]) {
    if (!(field in cur)) fail(`Missing required top-level field '${field}' in current report`);
  }

  ok("Report shape matches golden snapshot.");
})();
