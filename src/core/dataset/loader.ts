import fs from "fs";
import path from "path";

/**
 * Resolve a dataset path from:
 *  - absolute paths
 *  - relative paths
 *  - core/dataset/<path>
 *
 * If the path is a directory, the latest JSON file is selected.
 * Returns the full resolved path to a JSON file.
 */
export function resolveDatasetPath(datasetPath: string): string {
  let fullPath: string;

  // ------------------------------------------------------------
  // 1. Absolute path → use directly
  // ------------------------------------------------------------
  if (path.isAbsolute(datasetPath)) {
    fullPath = datasetPath;
  } else {
    // ------------------------------------------------------------
    // 2. Relative path → resolve from CWD
    // ------------------------------------------------------------
    const relativePath = path.resolve(datasetPath);
    if (fs.existsSync(relativePath)) {
      fullPath = relativePath;
    } else {
      // ------------------------------------------------------------
      // 3. Fallback: assume inside core/dataset/
      // ------------------------------------------------------------
      fullPath = path.resolve(__dirname, "..", "..", "dataset", datasetPath);
    }
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Dataset not found: ${datasetPath}`);
  }

  const stats = fs.statSync(fullPath);

  // ------------------------------------------------------------
  // If it's a directory → pick the latest JSON file
  // ------------------------------------------------------------
  if (stats.isDirectory()) {
    const files = fs
      .readdirSync(fullPath)
      .filter((f) => f.endsWith(".json"))
      .sort();

    if (files.length === 0) {
      throw new Error(`No JSON files found in directory: ${fullPath}`);
    }

    return path.join(fullPath, files[files.length - 1]);
  }

  // ------------------------------------------------------------
  // Otherwise return the file path directly
  // ------------------------------------------------------------
  return fullPath;
}

/**
 * Load and parse a dataset JSON file.
 */
export async function loadDataset(datasetPath: string): Promise<any> {
  const resolved = resolveDatasetPath(datasetPath);

  const raw = fs.readFileSync(resolved, "utf8");
  return JSON.parse(raw);
}
