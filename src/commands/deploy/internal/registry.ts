import fs from "fs";
import path from "path";

const ROOT = ".isa/deployments";

export function ensureRegistry() {
  const dirs = [
    ROOT,
    `${ROOT}/envelopes`,
    `${ROOT}/profiles`,
    `${ROOT}/models`,
    `${ROOT}/artifacts`,
    `${ROOT}/active`
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

export function writeDeployment(type: string, name: string, data: any) {
  ensureRegistry();

  const filePath = path.join(ROOT, type, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return filePath;
}

export function activateProfile(name: string) {
  ensureRegistry();

  const activePath = path.join(ROOT, "active", "profile.txt");
  fs.writeFileSync(activePath, name);
}

export function nextVersion(type: string, baseName: string): number {
  ensureRegistry();

  const dir = path.join(ROOT, type);
  const files = fs.readdirSync(dir);

  const versions = files
    .filter(f => f.startsWith(baseName))
    .map(f => {
      const match = f.match(/v(\d+)\.json$/);
      return match ? parseInt(match[1], 10) : 0;
    });

  return versions.length === 0 ? 1 : Math.max(...versions) + 1;
}
