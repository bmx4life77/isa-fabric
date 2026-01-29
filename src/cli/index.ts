#!/usr/bin/env node

// src/cli/index.ts

import { Command } from "commander";

// Core command groups
import { registerSceCommand } from "./commands/sce";
import { registerInspectCommand } from "./commands/inspect";
import { registerDatasetsCommand } from "./commands/datasets";
import { registerMetricsCommands } from "./commands/metrics";
import { registerGovernanceCommands } from "./commands/governance";
import { registerTagCommand } from "./commands/tags";
import { registerBenchmarkCommand } from "./commands/benchmark";

// New domain modules
import { registerIsoCommand } from "./commands/iso";
import { registerSecurityCommand } from "./commands/security";
import { registerAdversarialCommand } from "./commands/adversarial";
import { registerGcsCommand } from "./commands/gcs";
import { registerDeployCommands } from "./commands/deploy";
import { registerForecastCommand } from "./commands/forecast";

export function buildCLI() {
  const program = new Command();

  program
    .name("isa")
    .description("ISA Fabric Unified CLI")
    .version("0.4.0");

  // Register all command groups
  registerSceCommand(program);
  registerInspectCommand(program);
  registerDatasetsCommand(program);
  registerMetricsCommands(program);
  registerGovernanceCommands(program);
  registerTagCommand(program);
  registerBenchmarkCommand(program);

  // New modules
  registerIsoCommand(program);
  registerSecurityCommand(program);
  registerAdversarialCommand(program);
  registerGcsCommand(program);
  registerDeployCommands(program);
  registerForecastCommand(program);

  return program;
}

// Auto-run when invoked as a CLI 
if (require.main === module) { 
      buildCLI().parse(process.argv);
}

