import { runMetrics } from "../../src/engine/metrics";

describe("runMetrics()", () => {
  it("runs without crashing", async () => {
    await runMetrics({
      domain: "DEX",
      input: "test/data/telemetry-basic.json"
    });
  });
});
