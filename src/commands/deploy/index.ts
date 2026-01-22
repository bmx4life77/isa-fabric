// src/commands/deploy/index.ts
import { Command } from "commander";
import list from "./list";

// Subcommands (we'll fill these in later)
import envelope from "./envelope";
import profile from "./profile";
import model from "./model";
import wasm from "./wasm";
import rust from "./rust";
import artifact from "./artifact";
import diamond from "./diamond";

export default function registerDeployCommand(program: Command) {
  const deploy = program
    .command("deploy")
    .description("Deploy ISA artifacts to local or remote environments");

  // Register subcommands
  deploy.addCommand(envelope());
  deploy.addCommand(profile());
  deploy.addCommand(model());
  deploy.addCommand(wasm());
  deploy.addCommand(rust());
  deploy.addCommand(artifact());
  deploy.addCommand(diamond());
  deploy.addCommand(list());        
  return deploy;
}