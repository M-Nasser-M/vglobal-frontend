import * as z from "zod";
import { MetaSchema } from "./metaTypes";
import { SeoSchema } from "./seoTypes";

export const PermenantImmigrationPageDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  article: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
  vuid: z.union([z.string(), z.number(), z.null()]),
  versionNumber: z.number(),
  versionComment: z.union([z.null(), z.string()]),
  isVisibleInListView: z.boolean(),
  locale: z.string(),
  seo: z.union([z.null(), SeoSchema]).optional(),
});
export type PermenantImmigrationPageData = z.infer<
  typeof PermenantImmigrationPageDataSchema
>;

export const PermenantImmigrationPagesSchema = z.object({
  data: z.array(PermenantImmigrationPageDataSchema),
  meta: MetaSchema,
});
export type PermenantImmigrationPages = z.infer<
  typeof PermenantImmigrationPagesSchema
>;

export const PermenantImmigrationPageSchema = z.object({
  data: PermenantImmigrationPageDataSchema,
  meta: MetaSchema,
});
export type PermenantImmigrationPage = z.infer<
  typeof PermenantImmigrationPageSchema
>;
