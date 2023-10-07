import * as z from "zod";
import { ImageSchema } from "./imageComponetTypes";

export const MetaSocialSchema = z.object({
  id: z.number(),
  socialNetwork: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.union([ImageSchema, z.null()]).optional(),
});
export type MetaSocial = z.infer<typeof MetaSocialSchema>;

export const SeoSchema = z.object({
  id: z.number(),
  metaTitle: z.union([z.string(), z.null()]).optional(),
  metaDescription: z.union([z.string(), z.null()]).optional(),
  keywords: z.union([z.string(), z.null()]).optional(),
  metaRobots: z.union([z.string(), z.null()]).optional(),
  structuredData: z.union([z.object({}), z.null()]).optional(),
  metaViewport: z.union([z.string(), z.null()]).optional(),
  canonicalURL: z.union([z.string(), z.null()]).optional(),
  metaImage: z.union([ImageSchema, z.null()]).optional(),
  metaSocial: z
    .union([z.array(MetaSocialSchema).optional(), z.null()])
    .optional(),
});

export type Seo = z.infer<typeof SeoSchema>;
