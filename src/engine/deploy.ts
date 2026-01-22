import fs from "fs";
import path from "path";

const DEPLOY_DIR = path.resolve("deployments");

function ensureDir() {
  if (!fs.existsSync(DEPLOY_DIR)) {
    fs.mkdirSync(DEPLOY_DIR, { recursive: true });
  }
}

export function listDeployments() {
  ensureDir();
  const files = fs.readdirSync(DEPLOY_DIR);
  console.log("Deployments:");
  files.forEach(f => console.log(" -", f));
}

export function showHistory() {
  ensureDir();
  const historyPath = path.join(DEPLOY_DIR, "history.json");

  if (!fs.existsSync(historyPath)) {
    console.log("No deployment history found.");
    return;
  }

  const history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
  console.log(JSON.stringify(history, null, 2));
}

export function inspectDeployment(opts: any) {
  ensureDir();
  const file = path.join(DEPLOY_DIR, `${opts.id}.json`);

  if (!fs.existsSync(file)) {
    console.log(`Deployment ${opts.id} not found.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(JSON.stringify(data, null, 2));
}
