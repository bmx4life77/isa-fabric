import { Command } from "commander";

export default function rust() {
  const cmd = new Command("rust")
    .description("Deploy a Rust executable")
    .option("--release", "Build in release mode")
    .option("--strip", "Strip symbols from the binary")
    .option("--out <dir>", "Output directory")
    .action((options) => {
      console.log("Rust deploy invoked");
      console.log("Options:", options);
      // Implementation will go here later
    });

  return cmd;
}
