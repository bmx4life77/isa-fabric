import { z } from "zod";

export const EnvelopeSchema = z.object({
  metadata: z.object({
    source: z.string(),
    timestamp: z.number(),
    version: z.string()
  }),
 metrics: z.object({
  beta: z.record(z.string(), z.number()).optional(),
  vu: z.record(z.string(), z.number()).optional(),
  iota: z.record(z.string(), z.number()).optional(),
  phi: z.record(z.string(), z.number()).optional(),
  psi5: z.record(z.string(), z.number()).optional()
})
});

export type Envelope = z.infer<typeof EnvelopeSchema>;
