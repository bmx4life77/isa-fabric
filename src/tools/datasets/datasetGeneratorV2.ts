/**
 * ISA Fabric Dataset Generator v2.0 (TypeScript)
 * Generates 24–240 hour datasets for proper time-series analysis
 */

type MetricName =
  | "beta"
  | "psi5"
  | "SE"
  | "VU"
  | "phi"
  | "iota"
  | "divergence"
  | "ESI";

type ScenarioName =
  | "normal"
  | "ddos"
  | "insider_threat"
  | "supply_chain"
  | "regulatory_change";

interface ScenarioParams {
  attack_start: number | null;
  attack_duration: number;
}

interface MetricsSeries {
  [metric: string]: number[];
}

interface TimeSeriesEntry {
  timestamp: string;
  domain: string;
  metrics: { [metric: string]: number };
  attack_flag?: boolean;
  severity?: "HIGH" | "MEDIUM";
  coupled_from?: string;
  lag_hours?: number;
}

interface ScenarioDataset {
  scenario: string;
  generated_at: string;
  total_points: number;
  hours: number;
  start_date: string;
  end_date: string;
  time_series: TimeSeriesEntry[];
}

export class ISADatasetGeneratorV2 {
  private metrics: MetricName[] = [
    "beta",
    "psi5",
    "SE",
    "VU",
    "phi",
    "iota",
    "divergence",
    "ESI"
  ];

  private baselineParams: Record<
    MetricName,
    { mean: number; std: number }
  > = {
    beta: { mean: 0.78, std: 0.05 },
    psi5: { mean: 0.41, std: 0.03 },
    SE: { mean: 73.5, std: 2.0 },
    VU: { mean: 0.22, std: 0.05 },
    phi: { mean: 0.89, std: 0.03 },
    iota: { mean: 0.031, std: 0.005 },
    divergence: { mean: 12.0, std: 3.0 },
    ESI: { mean: 77.0, std: 2.0 }
  };

  private seed: number;

  constructor(seed: number = 42) {
    this.seed = seed;
  }

  /** Deterministic RNG (LCG) */
  private rand(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  /** Gaussian RNG via Box–Muller */
  private randNormal(mean = 0, std = 1): number {
    const u1 = this.rand() || 1e-10;
    const u2 = this.rand() || 1e-10;
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * std + mean;
  }

  /** Generate a single metric time series */
  private generateTimeSeries(
    length: number,
    metric: MetricName,
    scenario: ScenarioName,
    attack_start: number | null,
    attack_duration: number | null
  ): number[] {
    const { mean, std } = this.baselineParams[metric];
    const series: number[] = [];

    for (let t = 0; t < length; t++) {
      let value: number;

      // Random walk baseline
      if (t === 0) {
        value = this.randNormal(mean, std);
      } else {
        value = series[t - 1] + this.randNormal(0, std * 0.1);
      }

      // Daily seasonality
      const hour = t % 24;
      let seasonality = 0;

      if (hour >= 9 && hour <= 17) {
        if (metric === "beta") seasonality = 0.15;
        if (metric === "psi5") seasonality = -0.1;
        if (metric === "VU") seasonality = 0.2;
      }

      // Weekend effects
      const day = Math.floor(t / 24) % 7;
      if (day >= 5) {
        if (metric === "beta") seasonality -= 0.25;
        if (metric === "divergence") seasonality += 0.3;
      }

      value *= 1 + seasonality;

      // Scenario effects
      if (scenario !== "normal" && attack_start !== null && attack_duration !== null) {
        if (t >= attack_start && t < attack_start + attack_duration) {
          const progress = (t - attack_start) / attack_duration;

          if (scenario === "ddos") {
            if (metric === "beta") value *= 0.6 + 0.4 * (1 - progress);
            if (metric === "psi5") value *= 1 + 0.6 * progress;
            if (metric === "divergence") value *= 1 + 1.5 * progress;
            if (metric === "VU") value *= 1 + 1.2 * progress;
            if (metric === "SE") value *= 0.8 + 0.2 * (1 - progress);
          }

          if (scenario === "insider_threat") {
            if (metric === "psi5") value *= 1 + 0.8 * progress;
            if (metric === "divergence") value *= 1 + 0.5 * progress;
          }

          if (scenario === "supply_chain") {
            if (metric === "beta") {
              if (progress < 0.1) value *= 0.4;
              else value *= 0.4 + 0.6 * ((progress - 0.1) / 0.9);
            }
          }
        }
      }

      // Bounds
      if (metric === "SE" || metric === "ESI") value = Math.min(100, Math.max(0, value));
      if (["beta", "psi5", "phi", "VU"].includes(metric)) value = Math.min(1, Math.max(0, value));
      if (metric === "iota") value = Math.min(0.1, Math.max(-0.1, value));

      series.push(Number(value.toFixed(4)));
    }

    return series;
  }

  /** ESI = β × SE × (1 − VU) × integrity × momentum */
  private calculateESI(metrics: MetricsSeries): number[] {
    const length = metrics["beta"].length;
    const esi: number[] = [];

    for (let i = 0; i < length; i++) {
      let value =
        metrics["beta"][i] *
        metrics["SE"][i] *
        (1 - metrics["VU"][i]);

      const integrity = (1 + metrics["psi5"][i]) / 2;
      const momentum = 1 + metrics["iota"][i] * 10;

      value *= integrity * momentum;
      value = Math.min(100, Math.max(0, value));

      esi.push(Number(value.toFixed(3)));
    }

    return esi;
  }

  /** Generate a full scenario dataset */
  generateScenario(
    scenarioName: ScenarioName,
    hours: number,
    startDate: string
  ): ScenarioDataset {
    const scenarioParams: Record<ScenarioName, ScenarioParams> = {
      normal: { attack_start: null, attack_duration: 0 },
      ddos: { attack_start: 12, attack_duration: 12 },
      insider_threat: { attack_start: 24, attack_duration: 48 },
      supply_chain: { attack_start: 36, attack_duration: 24 },
      regulatory_change: { attack_start: 48, attack_duration: 72 }
    };

    const params = scenarioParams[scenarioName];

    // Generate metric series
    const metricsData: MetricsSeries = {};
    for (const metric of this.metrics) {
      if (metric !== "ESI") {
        metricsData[metric] = this.generateTimeSeries(
          hours,
          metric,
          scenarioName,
          params.attack_start,
          params.attack_duration
        );
      }
    }

    metricsData["ESI"] = this.calculateESI(metricsData);

    // Timestamps
    const timestamps: string[] = [];
    let current = new Date(startDate);

    for (let i = 0; i < hours; i++) {
      timestamps.push(current.toISOString().replace(".000Z", "Z"));
      current.setHours(current.getHours() + 1);
    }

    const timeSeries: TimeSeriesEntry[] = [];

    // Primary domain (finance)
    for (let i = 0; i < hours; i++) {
      const entry: TimeSeriesEntry = {
        timestamp: timestamps[i],
        domain: "finance",
        metrics: {}
      };

      for (const metric of this.metrics) {
        entry.metrics[metric] = metricsData[metric][i];
      }

      if (scenarioName === "ddos" && params.attack_start !== null) {
        if (i >= params.attack_start && i < params.attack_start + params.attack_duration) {
          entry.attack_flag = true;
          entry.severity = i < params.attack_start + 6 ? "HIGH" : "MEDIUM";
        }
      }

      timeSeries.push(entry);
    }

    // Cross-domain coupling
    if (["ddos", "supply_chain"].includes(scenarioName)) {
      const domains = ["retail", "manufacturing"] as const;
      const lagMap = { retail: 2, manufacturing: 4 };
      const strengthMap = { retail: 0.7, manufacturing: 0.5 };

      for (const domain of domains) {
        const lag = lagMap[domain];
        const strength = strengthMap[domain];

        for (let i = 0; i < hours; i++) {
          const coupled: TimeSeriesEntry = {
            timestamp: timestamps[i],
            domain,
            coupled_from: "finance",
            lag_hours: lag,
            metrics: {}
          };

          for (const metric of this.metrics) {
            let base =
              i >= lag ? metricsData[metric][i - lag] : metricsData[metric][0];

            let value = base * (1 - (1 - strength) * 0.3);

            if (domain === "retail" && metric === "beta") value *= 0.9;
            if (domain === "manufacturing" && metric === "SE") value *= 1.1;

            coupled.metrics[metric] = Number(value.toFixed(4));
          }

          timeSeries.push(coupled);
        }
      }
    }

    return {
      scenario: scenarioName,
      generated_at: new Date().toISOString().replace(".000Z", "Z"),
      total_points: timeSeries.length,
      hours,
      start_date: startDate,
      end_date: timestamps[timestamps.length - 1],
      time_series: timeSeries
    };
  }
}

/** Production helper (mirrors your Python version) */
export function generateProductionDatasets() {
  const gen = new ISADatasetGeneratorV2();

  return {
    baseline_normal_7d: gen.generateScenario("normal", 168, "2026-01-10T00:00:00"),
    adversarial_ddos_3d: gen.generateScenario("ddos", 72, "2026-01-17T00:00:00"),
    insider_threat_5d: gen.generateScenario("insider_threat", 120, "2026-01-12T00:00:00"),
    supply_chain_4d: gen.generateScenario("supply_chain", 96, "2026-01-13T00:00:00"),
    regulatory_change_10d: gen.generateScenario("regulatory_change", 240, "2026-01-07T00:00:00")
  };
}
