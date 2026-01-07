import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "contracts");

const SPDX = "// SPDX-License-Identifier: MIT";
const PRAGMA = "pragma solidity ^0.8.28;";

function processFile(filePath: string) {
  const src = fs.readFileSync(filePath, "utf8").trimStart();

  const hasSPDX = src.startsWith("// SPDX-License-Identifier:");
  const hasPragma = src.includes("pragma solidity");

  let out = src;

  if (!hasSPDX || !hasPragma) {
    const headerLines: string[] = [];
    if (!hasSPDX) headerLines.push(SPDX);
    if (!hasPragma) headerLines.push(PRAGMA);

    out = `${headerLines.join("\n")}\n\n${src}`;
    fs.writeFileSync(filePath, out);
    console.log(`✔ Fixed headers: ${filePath}`);
  }
}

function walk(dir: string) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (full.endsWith(".sol")) processFile(full);
  }
}

console.log("🔧 Fixing SPDX + pragma headers...");
walk(ROOT);
console.log("✨ Done.");
