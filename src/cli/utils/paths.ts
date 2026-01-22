import path from "path";
import fs from "fs";

/**
 * Resolve a module inside the engine folder.
 * Works in both src/ and dist/ environments.
 */
export function enginePath(...segments: string[]) {
  const candidates = [
    path.join(process.cwd(), "dist", "engine", ...segments),
    path.join(process.cwd(), "engine", ...segments),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p + ".js") || fs.existsSync(p + ".ts")) {
      return p;
    }
  }

  throw new Error(
    `enginePath: Could not resolve engine module: ${segments.join("/")}`
  );
}

/**
 * Resolve a schema file inside src/schemas or dist/schemas.
 */
export function schemaPath(...segments: string[]) {
  const candidates = [
    path.join(process.cwd(), "dist", "schemas", ...segments),
    path.join(process.cwd(), "src", "schemas", ...segments),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  throw new Error(
    `schemaPath: Could not resolve schema: ${segments.join("/")}`
  );
}
