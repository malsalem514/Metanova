import { z } from "zod";

const ownershipEnum = z.enum(["original", "stock", "template", "unknown"]);

const dimensionsSchema = z
  .object({
    w: z.number(),
    h: z.number(),
  })
  .nullable();

const assetItemSchema = z.object({
  // Existing fields
  category: z.string(),
  title: z.string(),
  description: z.string(),
  source: z.string(),
  target: z.string(),
  tags: z.array(z.string()),
  usedBy: z.array(z.string()),
  bytes: z.number(),
  // New fields
  approvedForProduction: z.boolean(),
  ownership: ownershipEnum,
  notes: z.string(),
  assignedTo: z.array(z.string()),
  dimensions: dimensionsSchema,
  format: z.string(),
});

export type AssetItem = z.infer<typeof assetItemSchema>;

export const assetManifestSchema = z.object({
  items: z.array(assetItemSchema),
  generatedAt: z.string().optional(),
  totalItems: z.number().optional(),
  categories: z.record(z.string(), z.number()).optional(),
});

export type AssetManifest = z.infer<typeof assetManifestSchema>;

export { assetItemSchema, ownershipEnum, dimensionsSchema };
