// src/security/computeSecurity.ts

import fs from "fs";
import path from "path";
import type { TagBank, MethodTag } from "../types/tagbank";
import type { SecurityTag } from "../types/security";
import { SecurityPosture } from "../shared/metrics/SecurityPosture";

/**
 * Result for a single method.
 */
export interface PostureResult {
  contract: string;
  method: string;        // signature or name
  score: number;         // 0..100
  band: "HARDENED" | "SECURE" | "REVIEW";
  details: {
    reentrancyScore: number;
    accessScore: number;
    stateSurfaceScore: number;
    upgradeScore: number;
    verificationScore: number;
  };
  securityTag?: SecurityTag;
}

/**
 * Summary result for a whole TagBank.
 */
export interface SecuritySummary {
  updatedAt: string;
  totalContracts: number;
  totalMethods: number;
  results: PostureResult[];
}

/**
 * Public entrypoint: compute posture for an entire TagBank.
 */
export function computeSecurityForTagBank(tagBank: TagBank): SecuritySummary {
  const results: PostureResult[] = [];

  for (const [contractKey, contract] of Object.entries(tagBank.contracts)) {
    const contractName = (contract as any).name || contractKey;

    for (const [mKey, method] of Object.entries(contract.methods)) {
      const methodTag = method as MethodTag;
      const posture = computeMethodPosture(
        contractName,
        mKey,
        methodTag
      );
      results.push(posture);
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    totalContracts: Object.keys(tagBank.contracts).length,
    totalMethods: results.length,
    results,
  };
}

/**
 * Derive a PostureResult for a single method.
 */
export function computeMethodPosture(
  contractName: string,
  methodKey: string,
  method: MethodTag
): PostureResult {
  // Coerce whatever is in method.security into a SecurityTag shape
  const tag = (method.security || {}) as SecurityTag;

  const R = scoreReentrancy(tag);
  const A = scoreAccess(tag);
  const S = scoreStateSurface(tag);
  const U = scoreUpgradeSafety(tag);
  const V = scoreVerification(tag);

  // Map to the SecurityPosture input model (0..1 risk/complexity)
  const reentrancyRisk = 1 - R;              // high R → low risk
  const accessControlComplexity = 1 - A;
  const stateMutationScope = 1 - S;
  const auditMaturity = V;                   // already 0..1

  const posture = SecurityPosture.evaluate({
    reentrancyRisk,
    accessControlComplexity,
    stateMutationScope,
    auditMaturity,
  });

  return {
    contract: contractName,
    method: method.signature || method.name || methodKey,
    score: posture.score,
    band: posture.band,
    details: {
      reentrancyScore: R,
      accessScore: A,
      stateSurfaceScore: S,
      upgradeScore: U,
      verificationScore: V,
    },
    securityTag: tag,
  };
}

/* ---------- Scoring helpers ---------- */

function scoreReentrancy(tag?: SecurityTag): number {
  if (!tag || !tag.reentrancy) return 0.3;
  switch (tag.reentrancy) {
    case "none":
      return 1.0;
    case "check-effects":
      return 0.8;
    case "guarded":
      return 0.9;
    default:
      return 0.3;
  }
}

function scoreAccess(tag?: SecurityTag): number {
  if (!tag || !tag.access) return 0.4;
  const access = tag.access.toLowerCase();

  if (access.includes("onlyowner")) return 0.9;
  if (access.includes("role:admin")) return 0.85;
  if (access.includes("multisig")) return 0.95;
  if (access === "none") return 0.2;
  return 0.5;
}

function scoreStateSurface(tag?: SecurityTag): number {
  if (!tag) return 0.5;
  if (tag.critical) return 0.3;       // critical methods → higher risk
  return 0.7;
}

function scoreUpgradeSafety(tag?: SecurityTag): number {
  if (!tag?.upgradeSafe) return 0.4;
  const u = tag.upgradeSafe;
  let score = 0.6;

  if (u.authorizeUpgrade) score += 0.2;
  if (u.storageGap) score += 0.1;
  if (u.initializerPresent) score += 0.1;

  return Math.min(score, 1.0);
}

function scoreVerification(tag?: SecurityTag): number {
  if (!tag?.tests) return 0.4;
  const t = tag.tests;
  let score = 0.5;

  if (t.slither === "pass") score += 0.2;
  if (t.fuzzCoverage && t.fuzzCoverage > 0.7) score += 0.15;
  if (t.audit) score += 0.1;
  if (t.formal) score += 0.15;

  return Math.min(score, 1.0);
}

/* ---------- CLI helper (optional) ---------- */

/**
 * If you run this file directly with ts-node:
 *   npx ts-node src/security/computeSecurity.ts ./artifacts/tag-bank.json
 * it will write ./artifacts/security-posture.json
 */
if (require.main === module) {
  const inputPath =
    process.argv[2] || path.join(process.cwd(), "artifacts", "tag-bank.json");
  const outputPath = path.join(
    process.cwd(),
    "artifacts",
    "security-posture.json"
  );

  if (!fs.existsSync(inputPath)) {
    console.error(`TagBank file not found at: ${inputPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const tagBank = JSON.parse(raw) as TagBank;
  const summary = computeSecurityForTagBank(tagBank);
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  console.log(
    `Security posture summary written → ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );
}
