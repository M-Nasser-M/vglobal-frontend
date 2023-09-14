import * as z from "zod";
import { SeoSchema } from "./seoTypes";
import { MetaSchema } from "./metaTypes";

export const DataSchema = z.object({
  id: z.number(),
  article: z.union([z.string(), z.null()]).optional(),
  createdAt: z.union([z.coerce.date(), z.null()]).optional(),
  updatedAt: z.union([z.coerce.date(), z.null()]).optional(),
  publishedAt: z.union([z.coerce.date(), z.null()]).optional(),
  locale: z.union([z.enum(["en", "ar"]), z.null()]).optional(),
  seo: z.union([SeoSchema, z.null()]).optional(),
});
export type Data = z.infer<typeof DataSchema>;

export const ArticleAndSeoSchema = z.object({
  data: DataSchema,
  meta: MetaSchema,
});

export type ArticleAndSeo = z.infer<typeof ArticleAndSeoSchema>;
