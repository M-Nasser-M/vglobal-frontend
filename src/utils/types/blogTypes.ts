import * as z from "zod";
import { MetaSchema } from "./metaTypes";
import { ImageSchema } from "./imageComponetTypes";
import { SeoSchema } from "./seoTypes";

export const DatumSchema = z.object({
  id: z.number(),
  article: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
  locale: z.string(),
  seo: z.union([z.null(), SeoSchema]).optional(),
  cover: z.union([z.null(), ImageSchema]).optional(),
});
export type Datum = z.infer<typeof DatumSchema>;

export const BlogsSchema = z.object({
  data: z.array(DatumSchema),
  meta: MetaSchema,
});
export type Blogs = z.infer<typeof BlogsSchema>;

export const BlogSchema = z.object({
  data: DatumSchema,
  meta: MetaSchema,
});

export type Blog = z.infer<typeof BlogSchema>;

export type BlogWithoutData = z.infer<typeof DatumSchema>;
