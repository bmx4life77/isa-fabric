/**
 * NatSpecExtractor
 * ----------------
 * 
 * Responsibilities:
 *   - Parse Solidity source files and extract NatSpec comments. These include:
 *       - Triple-slash form:  ///
 *       - Block-doc form:     /** ... *\/   (written here escaped for safety)
 *
 *   - Parse compiled Hardhat artifacts to extract embedded `devdoc` and `userdoc`
 *     sections from the metadata JSON.
 *
 *   - Merge both sources into a unified NatSpec index object.
 *
 * Output:
 *   - Writes JSON to:   ./artifacts/natspec-index.json
 */

import fs from "fs";
import path from "path";

// A single entry describing documentation for a function
export interface NatSpecFunctionDoc {
  name: string;
  notice?: string;
  dev?: string;
  params?: Record<string, string>;
  returns?: Record<string, string>;
}

// Documentation for a full contract
export interface NatSpecContractDoc {
  contractName: string;
  filePath?: string;
  functions: NatSpecFunctionDoc[];
}

// The complete NatSpec index object
export interface NatSpecIndex {
  contracts: NatSpecContractDoc[];
}


/**
 * Utility: Recursively list files under a directory.
 */
function listFilesRecursive(dir: string, ext: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(listFilesRecursive(full, ext));
    } else if (ext.some(e => entry.toLowerCase().endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}


/**
 * Extract NatSpec comments from a Solidity file using a minimal parser.
 */
function extractNatSpecFromSolidity(filePath: string): NatSpecContractDoc | null {
  const source = fs.readFileSync(filePath, "utf8");
  const contractRegex = /\bcontract\s+(\w+)/g;

  const functions: NatSpecFunctionDoc[] = [];
  let match: RegExpExecArray | null;

  while ((match = contractRegex.exec(source))) {
    const contractName = match[1];

    // Find functions for this contract
    const functionRegex = /(\/\/\/[^\n]*|\/\*\*[\s\S]*?\*\/)\s*function\s+(\w+)\s*\(([\s\S]*?)\)/g;
    let fm: RegExpExecArray | null;

    while ((fm = functionRegex.exec(source))) {
      const rawDoc = fm[1];
      const fnName = fm[2];

      const parsed: NatSpecFunctionDoc = {
        name: fnName,
        notice: undefined,
        dev: undefined,
        params: {},
        returns: {}
      };

      // Split doc by lines
      const lines = rawDoc.split("\n").map(l => l.trim());

      for (const l of lines) {
        if (l.startsWith("///")) {
          const text = l.replace("///", "").trim();

          if (text.startsWith("@notice")) {
            parsed.notice = text.replace("@notice", "").trim();
          } else if (text.startsWith("@dev")) {
            parsed.dev = text.replace("@dev", "").trim();
          } else if (text.startsWith("@param")) {
            const parts = text.replace("@param", "").trim().split(" ");
            const key = parts.shift() || "";
            parsed.params![key] = parts.join(" ");
          } else if (text.startsWith("@return")) {
            parsed.returns!["return"] = text.replace("@return", "").trim();
          }
        }
        // Block comment NatSpec (/** ... */)
        else if (l.startsWith("*")) {
          const text = l.replace("*", "").trim();
          if (text.startsWith("@notice")) {
            parsed.notice = text.replace("@notice", "").trim();
          } else if (text.startsWith("@dev")) {
            parsed.dev = text.replace("@dev", "").trim();
          }
        }
      }

      functions.push(parsed);
    }

    return {
      contractName,
      filePath,
      functions
    };
  }

  return null;
}


/**
 * Extract NatSpec docs from compiled JSON artifacts (metadata.devdoc / userdoc).
 */
function extractNatSpecFromArtifacts(artifactPath: string): NatSpecContractDoc | null {
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  if (!artifact.contractName || !artifact.metadata) return null;

  const metadata = JSON.parse(artifact.metadata);
  const devdoc = metadata?.output?.devdoc || {};
  const userdoc = metadata?.output?.userdoc || {};

  const functions: NatSpecFunctionDoc[] = [];

  // Extract functions from devdoc + userdoc
  if (devdoc.methods) {
    for (const key of Object.keys(devdoc.methods)) {
      const method = devdoc.methods[key];
      const parsed: NatSpecFunctionDoc = {
        name: key.split("(")[0],
        notice: userdoc.methods?.[key]?.notice || undefined,
        dev: method.details || undefined,
        params: method.params || {},
        returns: method.returns || {}
      };
      functions.push(parsed);
    }
  }

  return {
    contractName: artifact.contractName,
    filePath: artifact.sourceName,
    functions
  };
}


/**
 * Main entry: generate NatSpec index.
 */
export function generateNatSpecIndex(): NatSpecIndex {
  const index: NatSpecIndex = { contracts: [] };

  // 1. Extract from Solidity
  const solFiles = listFilesRecursive("./contracts", [".sol"]);
  for (const f of solFiles) {
    const doc = extractNatSpecFromSolidity(f);
    if (doc) index.contracts.push(doc);
  }

  // 2. Extract from artifacts
  const artifactFiles = listFilesRecursive("./artifacts", [".json"]);
  for (const f of artifactFiles) {
    try {
      const doc = extractNatSpecFromArtifacts(f);
      if (doc) index.contracts.push(doc);
    } catch {
      // ignore non-standard artifacts
    }
  }

  // 3. Write out index
  const outPath = "./artifacts/natspec-index.json";
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2));

  console.log(`NatSpec index generated → ${outPath}`);

  return index;
}

// When run directly:
if (require.main === module) {
  generateNatSpecIndex();
}
