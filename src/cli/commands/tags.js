import { transformNatSpecPP } from "../../engine/natspec/transform.js";

export const tagsCommand = program => {
  program
    .command("tags transform <file>")
    .description("Transform NatSpec++ tags into Hardhat-compatible tags")
    .action((file) => {
      transformNatSpecPP(file);
      console.log(`Transformed NatSpec++ tags in ${file}`);
    });
};
