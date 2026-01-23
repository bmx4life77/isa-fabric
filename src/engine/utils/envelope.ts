import fs from "fs";
import path from "path";

export function writeEnvelope(outPath: string, data: any) {
  const full = path.resolve(outPath);
  const dir = path.dirname(full);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(full, JSON.stringify(data, null, 2));
}
