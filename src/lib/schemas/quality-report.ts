import { z } from "zod";

const overallEnum = z.enum(["pass", "fail"]);

const coreWebVitalsSchema = z.object({
  lcp: z.number(),
  fid: z.number(),
  cls: z.number(),
});

const lighthousePageSchema = z.object({
  perf: z.number(),
  a11y: z.number(),
  bp: z.number(),
  seo: z.number(),
  coreWebVitals: coreWebVitalsSchema,
});

const lighthouseSchema = z.record(z.string(), lighthousePageSchema);

const screenshotSchema = z.object({
  path: z.string(),
  viewports: z.array(z.string()),
  reviewed: z.boolean(),
});

const metadataPageSchema = z.record(z.string(), z.string());
const metadataSchema = z.record(z.string(), metadataPageSchema);

const contentSchema = z.object({
  placeholder_text: z.array(z.string()),
  facts_mismatches: z.array(z.string()),
  orphan_assets: z.array(z.string()),
  dead_links: z.array(z.string()),
  template_remnants: z.array(z.string()),
  passed: z.boolean(),
});

export const qualityReportSchema = z.object({
  generatedAt: z.string(),
  overall: overallEnum,
  lighthouse: lighthouseSchema,
  screenshots: z.array(screenshotSchema),
  metadata: metadataSchema,
  content: contentSchema,
});

export type QualityReport = z.infer<typeof qualityReportSchema>;

export {
  overallEnum,
  lighthousePageSchema,
  coreWebVitalsSchema,
  screenshotSchema,
  contentSchema,
};
