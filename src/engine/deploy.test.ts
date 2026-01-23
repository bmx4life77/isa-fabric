import { listDeployments, showHistory, inspectDeployment } from "../../src/engine/deploy";

describe("deploy engine", () => {
  it("lists deployments", () => listDeployments());
  it("shows history", () => showHistory());
  it("inspects deployment", () => inspectDeployment({ id: "test" }));
});
