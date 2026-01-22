// src/benchmarking/schema.ts
import { z } from "zod";

/**
 * Minimal example schema for a time-series security dataset.
 * You can refine this later for the Cloudflare profile.
 */
export const DataPointSchema = z.object({
  timestamp: z.string(), // ISO8601
  value: z.number(),     // e.g., requests per second
  meta: z
    .object({
      source: z.string().optional(),
      severity: z.string().optional(),
    })
    .optional(),
});

export const DatasetSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  domain: z.string().default("cybersecurity"),
  points: z.array(DataPointSchema).nonempty(),
});

export type Dataset = z.infer<typeof DatasetSchema>;
export type DataPoint = z.infer<typeof DataPointSchema>;

export function parseDataset(raw: unknown): Dataset {
  return DatasetSchema.parse(raw);
}
