import { z } from "zod";

export const ProfileSchema = z.object({
  domain: z.string(),
  subdomain: z.string(),
  weights: z.object({
    beta: z.number(),
    vu: z.number(),
    iota: z.number(),
    phi: z.number(),
    psi5: z.number()
  }),
  narrative_rules: z.record(z.string(), z.any()).optional()
});

export type Profile = z.infer<typeof ProfileSchema>;
