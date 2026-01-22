import { Command } from "commander";
import { loadDataset } from "../../../core/dataset/loader";
import { thetaForecast } from "../../../core/engine/theta/thetaForecast";

/**
 * registerThetaCommand(program)
 *
 * Registers the "forecast theta" command with the ISA CLI.
 */
export function registerThetaCommand(program: Command) {
  const forecast = program
    .command("forecast")
    .description("Forecasting tools");

  forecast
    .command("theta")
    .description("Run Theta forecasting on a dataset")
    .option("--dataset <path>", "Dataset file or folder inside core/dataset")
    .option("--metric <metric>", "Metric to forecast (e.g., BTC.price)")
    .option("--horizon <hours>", "Forecast horizon in hours", "24")
    .action(async (options: { dataset?: string; metric?: string; horizon?: string }) => {
      try {
        const { dataset, metric, horizon } = options;

        if (!dataset) {
          console.error("Error: --dataset is required");
          process.exit(1);
        }

        if (!metric) {
          console.error("Error: --metric is required");
          process.exit(1);
        }

        const data = await loadDataset(dataset);
        const result = thetaForecast(data, metric, Number(horizon ?? "24"));

        console.log(JSON.stringify(result, null, 2));
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Theta forecast failed:", message);
        process.exit(1);
      }
    });
}
