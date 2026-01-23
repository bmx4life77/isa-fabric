import { runFullPipeline } from "../../src/engine/pipeline";

describe("runFullPipeline()", () => {
  it("executes the full pipeline", async () => {
    await runFullPipeline({
      domain: "DEX",
      input: "test/data/telemetry-basic.json"
    });
  });
});
