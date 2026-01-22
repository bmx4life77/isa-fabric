// src/cli/commands/tags.ts
import { Command } from "commander";
import { generateTag } from "../../core/tags/TagMethodGenerator";

export function registerTagCommand(program: Command) {
  const tags = program
    .command("tags")
    .description("Tag generation and NatSpec++ tagging utilities");

  tags
    .command("generate")
    .requiredOption("-c, --contract <name>", "Contract name")
    .requiredOption("-m, --method <name>", "Method name")
    .option("-d, --domain <domain>", "ISA domain")
    .action((options) => {
      const tag = generateTag({
        contractName: options.contract,
        method: options.method,
        domain: options.domain,
      });

      console.log(JSON.stringify(tag, null, 2));
    });
}
