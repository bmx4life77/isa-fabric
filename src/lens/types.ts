export interface LensContext {
  // You can extend this later with:
  // - domain config
  // - global settings
  // - registry info
}

export interface LensResult {
  // Raw numeric signals (e.g., time series, distributions)
  values?: number[];

  // Aggregated summaries (more directly usable for metrics)
  summary?: Record<string, number>;

  // Optional human-readable note, for debugging / future insight generation
  note?: string;
}

export interface Lens {
  id: string;
  name: string;
  description: string;
  // You can add tags: string[] later if helpful.
  apply: (dataset: any, ctx: LensContext) => LensResult;
}
