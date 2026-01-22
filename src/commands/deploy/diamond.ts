import { Command } from "commander";
import * as deployModule from "../../core/deploy/deploy";

export default function diamond() {
  const cmd = new Command("diamond")
    .description("Perform diamond cutting deployment operations")
    .requiredOption("-n, --network <name>", "Network name")
    .action(async (options) => {
      if (!("deployDiamond" in deployModule)) {
        console.error("deployDiamond() not found in core/deploy/deploy.ts");
        process.exit(1);
      }

      // @ts-ignore – until you type it
      await deployModule.deployDiamond(options.network);
      console.log(`Diamond deployed on network: ${options.network}`);
    });

  return cmd;
}
