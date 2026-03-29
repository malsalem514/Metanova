import { z } from "zod";

const lighthouseScoresSchema = z.object({
  perf: z.number(),
  a11y: z.number(),
  bp: z.number(),
  seo: z.number(),
});

export const deployReportSchema = z.object({
  previewUrl: z.string().url(),
  productionUrl: z.string().url(),
  githubRepo: z.string().nullable(),
  deployedAt: z.string(),
  lighthouseProduction: lighthouseScoresSchema,
});

export type DeployReport = z.infer<typeof deployReportSchema>;

export { lighthouseScoresSchema };
