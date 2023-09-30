import * as z from "zod";

export const FormatsSizesSchema = z.object({
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
export type Large = z.infer<typeof FormatsSizesSchema>;

export const FormatsSchema = z.object({
  large: FormatsSizesSchema.optional(),
  small: FormatsSizesSchema.optional(),
  medium: FormatsSizesSchema.optional(),
  thumbnail: FormatsSizesSchema.optional(),
});
export type Formats = z.infer<typeof FormatsSchema>;

export const ProviderMetadataSchema = z.object({
  public_id: z.string(),
  resource_type: z.string(),
});
export type ProviderMetadata = z.infer<typeof ProviderMetadataSchema>;

export const ImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.union([z.null(), z.string()]).optional(),
  caption: z.union([z.null(), z.string()]).optional(),
  width: z.number(),
  height: z.number(),
  formats: FormatsSchema.optional(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.union([z.null(), z.string()]).optional(),
  provider: z.string(),
  provider_metadata: z.union([z.null(), ProviderMetadataSchema]).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  placeholder: z.string(),
});
export type Image = z.infer<typeof ImageSchema>;
