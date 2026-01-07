import { ShockSpec } from "../analytics/shock";
import { CompositeForecast } from "../analytics/compositeForecast";

export interface ShockExplanation {
  summary: string;
  effects: string[];
}

export function explainShock(
  shock: ShockSpec,
  forecast: CompositeForecast
): ShockExplanation {
  const effects: string[] = [];

  if (shock.mode === "auto") {
    effects.push(
      "Shock was auto-placed at a natural instability inflection point."
    );
  }

  if (shock.mode === "mid20") {
    effects.push(
      "Shock was applied across the middle operational window, causing sustained degradation."
    );
  }

  if (shock.betaDelta && shock.betaDelta < 0) {
    effects.push(
      "Commit coherence (β) was reduced, weakening trend confidence."
    );
  }

  if (shock.psi5Delta && shock.psi5Delta > 0) {
    effects.push(
      "Anomaly pressure (ψ₅) was amplified, increasing instability sensitivity."
    );
  }

  if (shock.vMult && shock.vMult > 1) {
    effects.push(
      "Volatility was multiplicatively amplified, widening forecast uncertainty."
    );
  }

  effects.push(
    `Resulting classification: ${forecast.classification}.`
  );

  return {
    summary: `Adversarial shock (${shock.mode}) materially altered system dynamics.`,
    effects,
  };
}
