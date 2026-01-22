import { Command } from "commander";
import { enginePath } from "../utils/paths";

// If you later add governance engine logic, import it like this:
// const evaluateGovernance = require(enginePath("governance", "evaluate")).evaluateGovernance;

export function registerGovernanceCommands(program: Command) {
  const gov = program
    .command("governance")
    .description("Governance evaluation and proposal analysis");

  gov
    .command("run")
    .requiredOption("--proposal <id>", "Proposal identifier")
    .description("Run governance evaluation for a proposal")
    .action((opts) => {
      const result = {
        proposalId: opts.proposal,
        status: "evaluated",
      };

      console.log(JSON.stringify(result, null, 2));
    });
}
