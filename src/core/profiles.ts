import { ScoreWeights, defaultWeights } from "./scoring";

export type DomainProfile = {
  name: string;
  weights: ScoreWeights;
};

const profiles: Record<string, DomainProfile> = {
  cloudflare: {
    name: "cloudflare",
    weights: {
      availability: 0.20,
      performance: 0.40,
      resilience: 0.25,
      security: 0.15
    }
  },

  finance: {
    name: "finance",
    weights: {
      availability: 0.20,
      performance: 0.50,
      resilience: 0.20,
      security: 0.10
    }
  },

  safety: {
    name: "safety",
    weights: {
      availability: 0.40,
      performance: 0.10,
      resilience: 0.30,
      security: 0.20
    }
  }
};

export function loadProfile(name: string | undefined): DomainProfile {
  if (!name) {
    return { name: "default", weights: defaultWeights };
  }

  const key = name.toLowerCase();
  if (profiles[key]) {
    return profiles[key];
  }

  console.warn(`Profile "${name}" not found. Using default weights.`);
  return { name: "default", weights: defaultWeights };
}
