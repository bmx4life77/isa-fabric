/**
 * Relink Core Imports
 * -------------------
 * Updates imports across the project when moving core engine files into `src/core/`.
 * Usage: ts-node scripts/relink-core-imports.ts
 */

import fs from "fs";
import path from "path";
import chalk from "chalk";

const CORE_FILES = ["NatSpecInterpreter", "Orchestrator", "TagBank", "TagProfileValidator"];

function walk(dir: string): string[] {
  let files: string[] = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (f.endsWith(".ts")) files.push(full);
  }
  return files;
}

function main() {
  console.log(chalk.cyanBright("\n🔄 Updating imports for core engine relocation..."));
  const srcRoot = path.join(process.cwd(), "src");
  const tsFiles = walk(srcRoot);

  for (const file of tsFiles) {
    let code = fs.readFileSync(file, "utf8");
    let modified = false;

    for (const core of CORE_FILES) {
      const regex = new RegExp(`(['"])\\.\\.\\/.*${core}\\1`, "g");
      if (regex.test(code)) {
        code = code.replace(regex, `"$1../core/${core}$1`);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(file, code);
      console.log(chalk.green(`✅ Updated imports in ${file}`));
    }
  }

  console.log(chalk.greenBright("\n🎉 Core imports relinked successfully!\n"));
}

main();
