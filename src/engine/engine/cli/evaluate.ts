/**
 * ISA Fabric — CLI Engine
 * evaluate.ts
 *
 * Runs the full pipeline: Metrics → Modulation → Governance → Lifecycle.
 */

import fs from "fs";
import path from "path";

import { computeMetrics } from "../metrics/compute";
import { modulateMetrics, modulateRoleAware } from "../modulation/modulate";
import { evaluateGovernance } from "../governance/evaluate";
import { evaluateProposalLifecycle } from "../governance/proposal_lifecycle";

export function runEvaluateCommand(args: {
  domain: string;
  input: string;
  role?: string;
}) {
  // 1. Load telemetry
  const inputPath = path.resolve(args.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const telemetry = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  // 2. Compute metrics
  const metrics = computeMetrics(telemetry, { name: args.domain });

  // 3. Base modulation (always used for governance)
  const baseModulated = modulateMetrics(metrics);

  // 3b. Optional role-aware view (used only for CLI output)
  const modulated = args.role
    ? modulateRoleAware(baseModulated, args.role)
    : baseModulated;

  // 4. Governance evaluation (always uses base modulation)
  const decision = evaluateGovernance(baseModulated);

  // 5. Proposal lifecycle
  const lifecycle = evaluateProposalLifecycle(decision);

  // 6. Print results
  console.log("ISA Governance Evaluation:");
  console.log(JSON.stringify(lifecycle, null, 2));
}
