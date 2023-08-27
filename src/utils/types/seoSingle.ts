import * as z from "zod";
import { SeoSchema } from "./seo";
import { MetaSchema } from "./meta";

export const DataSchema = z.object({
  id: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
  locale: z.string(),
  seo: SeoSchema,
});

export type Data = z.infer<typeof DataSchema>;

export const SingleAndSeoSchema = z.object({
  data: DataSchema,
  meta: MetaSchema,
});
export type SingleAndSeo = z.infer<typeof SingleAndSeoSchema>;
