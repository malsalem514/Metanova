import { z } from "zod";

// ── Meta schema (shared across all pages) ──────────────────────────
const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
  og_title: z.string(),
  og_description: z.string(),
  og_image: z.string().nullable(),
});

export type Meta = z.infer<typeof metaSchema>;

// ── Tier 1: Extracted (raw scrape output) ──────────────────────────
export const extractedSchema = z.object({
  raw_text_by_page: z.record(z.string(), z.string()),
  extraction_date: z.string(),
  source_url: z.string().url(),
});

export type Extracted = z.infer<typeof extractedSchema>;

// ── Tier 2: Confirmed (human-reviewed structured data) ─────────────
const companySchema = z.object({
  name: z.string(),
  legal_name: z.string(),
  tagline: z.string(),
  founded: z.number(),
  location: z.string(),
});

const personSchema = z.object({
  name: z.string(),
  role: z.string(),
  title: z.string(),
  bio: z.string(),
  portrait: z.string(),
});

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
  key_points: z.array(z.string()),
  detailed_description: z.string(),
});

const contactSchema = z.object({
  address: z.string(),
  email: z.string(),
  phone: z.string(),
});

const projectTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
});

const navLabelSchema = z.object({
  slug: z.string(),
  label: z.string(),
});

const footerSchema = z.object({
  tagline: z.string(),
  legal_text: z.string(),
});

export const confirmedSchema = z.object({
  company: companySchema,
  people: z.array(personSchema),
  services: z.array(serviceSchema),
  contact: contactSchema,
  project_types: z.array(projectTypeSchema),
  nav_labels: z.array(navLabelSchema),
  footer: footerSchema,
});

export type Confirmed = z.infer<typeof confirmedSchema>;

// ── Tier 3: Generated (per-route page content) ─────────────────────

const sectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  body: z.string(),
  cta_text: z.string().optional(),
});

/** `/` — Home page */
const homePageSchema = z.object({
  hero_headline: z.string(),
  hero_subline: z.string(),
  sections: z.array(sectionSchema),
  meta: metaSchema,
});

/** `/about` — About page with vision/mission and team sections */
const aboutSectionVisionMission = z.object({
  id: z.string(),
  vision_heading: z.string(),
  vision_body: z.string(),
  mission_heading: z.string(),
  mission_body: z.string(),
});

const aboutSectionTeam = z.object({
  id: z.string(),
  heading: z.string(),
});

const aboutPageSchema = z.object({
  hero_headline: z.string(),
  sections: z.array(z.union([aboutSectionVisionMission, aboutSectionTeam])),
  meta: metaSchema,
});

/** `/services` — Services listing */
const servicesPageSchema = z.object({
  hero_headline: z.string(),
  hero_subline: z.string(),
  meta: metaSchema,
});

/** `/services/[slug]` — Individual service detail */
const serviceDetailPageSchema = z.object({
  cta_text: z.string(),
  meta: metaSchema,
});

/** `/residential`, `/hospitality`, `/commercial` — Vertical pages */
const verticalPageSchema = z.object({
  hero_headline: z.string(),
  intro: z.string(),
  meta: metaSchema,
});

/** `/contact` — Contact page */
const contactPageSchema = z.object({
  hero_headline: z.string(),
  hero_subline: z.string(),
  form_heading: z.string(),
  cta_text: z.string(),
  meta: metaSchema,
});

/**
 * Union of all possible page content shapes.
 * Pages are keyed by route string in the record, so we use a union
 * to allow any valid page shape as the value type.
 */
const pageContentSchema = z.union([
  homePageSchema,
  aboutPageSchema,
  servicesPageSchema,
  serviceDetailPageSchema,
  verticalPageSchema,
  contactPageSchema,
]);

export const generatedSchema = z.object({
  tone: z.string(),
  pages: z.record(z.string(), pageContentSchema),
});

export type Generated = z.infer<typeof generatedSchema>;

// ── Combined site brief ────────────────────────────────────────────
export const siteBriefSchema = z.object({
  extracted: extractedSchema,
  confirmed: confirmedSchema,
  generated: generatedSchema,
});

export type SiteBrief = z.infer<typeof siteBriefSchema>;

// Re-export page schemas for consumers that need specific validation
export {
  metaSchema,
  homePageSchema,
  aboutPageSchema,
  servicesPageSchema,
  serviceDetailPageSchema,
  verticalPageSchema,
  contactPageSchema,
  pageContentSchema,
};
