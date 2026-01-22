import { z } from "zod";

export const ArtifactSchema = z.object({
  type: z.string(),
  data: z.any(),
  metadata: z.record(z.string(), z.any()).optional()
});

export type Artifact = z.infer<typeof ArtifactSchema>;
