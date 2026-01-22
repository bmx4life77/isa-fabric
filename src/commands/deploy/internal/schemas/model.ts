import { z } from "zod";

export const ModelSchema = z.object({
  type: z.enum(["rl", "forecast"]),
  version: z.string(),
  parameters: z.record(z.string(), z.any()),
  policy: z.string(),
});

export type Model = z.infer<typeof ModelSchema>;
