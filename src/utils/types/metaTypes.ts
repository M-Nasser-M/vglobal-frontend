import * as z from "zod";

export const PaginationSchema = z.object({
  page: z.union([z.number(), z.null()]).optional(),
  pageSize: z.union([z.number(), z.null()]).optional(),
  pageCount: z.union([z.number(), z.null()]).optional(),
  total: z.union([z.number(), z.null()]).optional(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const MetaClassSchema = z.object({
  pagination: z.union([PaginationSchema, z.null()]).optional(),
});
export type MetaClass = z.infer<typeof MetaClassSchema>;

export const MetaSchema = MetaClassSchema;
export type Meta = z.infer<typeof MetaSchema>;
