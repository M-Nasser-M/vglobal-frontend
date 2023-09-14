import * as z from "zod";
import { ImageSchema } from "./imageComponetTypes";

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
});

export type Seo = z.infer<typeof SeoSchema>;
