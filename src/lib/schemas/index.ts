// ── Site Brief (three-tier content model) ──────────────────────────
export {
  extractedSchema,
  confirmedSchema,
  generatedSchema,
  siteBriefSchema,
  metaSchema,
  homePageSchema,
  aboutPageSchema,
  servicesPageSchema,
  serviceDetailPageSchema,
  verticalPageSchema,
  contactPageSchema,
  pageContentSchema,
} from "./site-brief";

export type {
  Extracted,
  Confirmed,
  Generated,
  SiteBrief,
  Meta,
} from "./site-brief";

// ── Asset Manifest ─────────────────────────────────────────────────
export {
  assetManifestSchema,
  assetItemSchema,
  ownershipEnum,
  dimensionsSchema,
} from "./asset-manifest";

export type { AssetManifest, AssetItem } from "./asset-manifest";

// ── Site Manifest ──────────────────────────────────────────────────
export {
  siteManifestSchema,
  templateEnum,
  pageSchema,
} from "./site-manifest";

export type { SiteManifest } from "./site-manifest";

// ── Blueprint ──────────────────────────────────────────────────────
export {
  blueprintSchema,
  fontSchema,
  typographySchema,
  motionBudgetEnum,
  motionSchema,
  ctaSchema,
  ctaStyleSchema,
  blueprintPageSchema,
} from "./blueprint";

export type { Blueprint } from "./blueprint";

// ── Quality Report ─────────────────────────────────────────────────
export {
  qualityReportSchema,
  overallEnum,
  lighthousePageSchema,
  coreWebVitalsSchema,
  screenshotSchema,
  contentSchema,
} from "./quality-report";

export type { QualityReport } from "./quality-report";

// ── Deploy Report ──────────────────────────────────────────────────
export {
  deployReportSchema,
  lighthouseScoresSchema,
} from "./deploy-report";

export type { DeployReport } from "./deploy-report";
