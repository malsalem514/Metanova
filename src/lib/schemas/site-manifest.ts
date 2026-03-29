import { z } from "zod";

const templateEnum = z.enum([
  "home",
  "about",
  "services",
  "service-detail",
  "vertical",
  "contact",
]);

const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  template: templateEnum,
});

const typographySchema = z.object({
  primary: z.string(),
  secondary: z.string(),
});

const colorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
  text: z.string(),
});

const layoutSchema = z.object({
  maxWidth: z.string(),
  headerStyle: z.string(),
  footerStyle: z.string(),
});

export const siteManifestSchema = z.object({
  source: z.string(),
  extractedAt: z.string(),
  pages: z.array(pageSchema),
  typography: typographySchema,
  colors: colorsSchema,
  layout: layoutSchema,
});

export type SiteManifest = z.infer<typeof siteManifestSchema>;

export { templateEnum, pageSchema };
