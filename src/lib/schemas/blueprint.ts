import { z } from "zod";

const fontSchema = z.object({
  family: z.string(),
  weights: z.array(z.number()),
  source: z.string(),
});

const typographySchema = z.object({
  display: fontSchema,
  body: fontSchema,
  scale: z.record(z.string(), z.string()),
});

const colorsSchema = z.record(z.string(), z.string());

const motionBudgetEnum = z.enum(["minimal", "moderate", "expressive"]);

const motionSchema = z
  .object({
    budget: motionBudgetEnum,
  })
  .passthrough();

const ctaStyleSchema = z.object({
  text: z.string(),
  style: z.string(),
});

const ctaSchema = z.object({
  primary: ctaStyleSchema,
  secondary: ctaStyleSchema,
  tertiary: ctaStyleSchema,
});

const blueprintPageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  template: z.string(),
  priority: z.number(),
});

export const blueprintSchema = z.object({
  typography: typographySchema,
  colors: colorsSchema,
  motion: motionSchema,
  cta: ctaSchema,
  pages: z.array(blueprintPageSchema),
  dark_mode: z.boolean(),
});

export type Blueprint = z.infer<typeof blueprintSchema>;

export {
  fontSchema,
  typographySchema,
  motionBudgetEnum,
  motionSchema,
  ctaSchema,
  ctaStyleSchema,
  blueprintPageSchema,
};
