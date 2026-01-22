// src/cli/commands/deploy.ts
import { Command } from "commander";
// Assuming your existing deploy.ts has exported functions
import * as deployModule from "./deploy";


export function registerDeployCommands(program: Command) {
  const deploy = program
    .command("deploy")
    .description("Deployment and diamond cutting operations");

  deploy
    .command("diamond")
    .requiredOption("-n, --network <name>", "Network name")
    .action(async (options) => {
      if (!("deployDiamond" in deployModule)) {
        console.error("deployDiamond() not found in deploy.ts");
        process.exit(1);
      }

      // @ts-ignore – until you type it
      await deployModule.deployDiamond(options.network);
      console.log(`Diamond deployed on network: ${options.network}`);
    });
}
