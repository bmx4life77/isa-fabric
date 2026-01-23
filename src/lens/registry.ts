import { Lens } from "./types";
import { temporalStabilityLens } from "../domain-packs/temporal/lenses/temporalStabilityLens";
// In the future, you'll add cybersecurity lenses etc.

export function getLensesForDomain(domain: string): Lens[] {
  switch (domain) {
    case "temporal":
      return [temporalStabilityLens];

    // case "cybersecurity":
    //   return [networkDefenseLens, anotherLens];

    default:
      return [];
  }
}
