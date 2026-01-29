import { Command } from "commander";
import {
  runForecastTheta,
  runForecastRisk,
  runForecastSimulate
} from "../../../domain/forecast";

export function registerForecastCommand(program: Command) {
  const forecast = program
    .command("forecast")
    .description("Run ISA Fabric forecasting");

  forecast
    .command("theta")
    .description("Run theta-based forecast")
    .action(async (options) => {
      await runForecastTheta(options);
    });

  forecast
    .command("risk")
    .description("Run risk forecast")
    .action(async (options) => {
      await runForecastRisk(options);
    });

  forecast
    .command("simulate")
    .description("Run forecast simulation")
    .action(async (options) => {
      await runForecastSimulate(options);
    });
}
