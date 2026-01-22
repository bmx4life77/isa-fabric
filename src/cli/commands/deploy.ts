import { Command } from "commander";
import { showHistory, inspectDeployment, listDeployments } from "../../engine/deploy";

export function registerDeployCommands(program: Command) {
  const deploy = program.command("deploy");

  deploy.command("list").action(listDeployments);

  deploy.command("history").action(showHistory);

  deploy
    .command("inspect")
    .requiredOption("--id <id>")
    .action(inspectDeployment);
}
