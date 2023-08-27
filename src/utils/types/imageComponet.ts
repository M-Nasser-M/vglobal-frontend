import * as z from "zod";

export const LargeSchema = z.object({
  ext: z.string(),
  url: z.string(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  path: z.null(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
});
export type Large = z.infer<typeof LargeSchema>;

export const FormatsSchema = z.object({
  large: LargeSchema,
  small: LargeSchema,
  medium: LargeSchema,
  thumbnail: LargeSchema,
});
export type Formats = z.infer<typeof FormatsSchema>;

export const ImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.union([z.null(), z.string()]).optional(),
  caption: z.union([z.null(), z.string()]).optional(),
  width: z.number(),
  height: z.number(),
  formats: FormatsSchema,
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.null(),
  provider: z.string(),
  provider_metadata: z.null(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  placeholder: z.string(),
});
export type Image = z.infer<typeof ImageSchema>;
