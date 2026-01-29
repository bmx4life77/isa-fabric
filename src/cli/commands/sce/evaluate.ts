import { Command } from "commander";
import { loadArtifact } from "../../../artifacts/loadArtifact";
import { evaluateSCE } from "../../../sce/core/evaluator";

export function registerSceEvaluateCommand(program: Command) {
  const cmd = new Command("sce")
    .description("Spec Compliance Engine commands");

  const evaluateCmd = new Command("evaluate")
    .description("Evaluate a contract using the Spec Compliance Engine")
    .requiredOption("-f, --file <path>", "Solidity contract file")
    .action((opts) => {
      const artifact = loadArtifact(opts.file);
      const evaluation = evaluateSCE(artifact);
      console.log(JSON.stringify(evaluation, null, 2));
    });

  cmd.addCommand(evaluateCmd);
  program.addCommand(cmd);
}
