import * as z from "zod";
import { SeoSchema } from "./seoTypes";
import { MetaSchema } from "./metaTypes";

export const LabelAndTooltipSchema = z.object({
  label: z.union([z.string(), z.null()]),
  tooltip: z.union([z.string(), z.null()]),
});

export const DataSchema = z.object({
  id: z.number(),
  labelandtooltip: z
    .union([z.array(LabelAndTooltipSchema), z.null()])
    .optional(),
  visit: z.union([z.string(), z.null()]).optional(),
  study: z.union([z.string(), z.null()]).optional(),
  immigrate: z.union([z.string(), z.null()]).optional(),
  createdAt: z.union([z.coerce.date(), z.null()]).optional(),
  updatedAt: z.union([z.coerce.date(), z.null()]).optional(),
  publishedAt: z.union([z.coerce.date(), z.null()]).optional(),
  locale: z.union([z.enum(["en", "ar"]), z.null()]).optional(),
  seo: z.union([SeoSchema, z.null()]).optional(),
});
export type Data = z.infer<typeof DataSchema>;

export const HomeAndSeoSchema = z.object({
  data: DataSchema,
  meta: MetaSchema,
});

export type HomeAndSeoType = z.infer<typeof HomeAndSeoSchema>;
