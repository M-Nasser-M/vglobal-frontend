import * as z from "zod";

export const CredentialsSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .optional();

export type CredentialsType = z.infer<typeof CredentialsSchema>;

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  provider: z.union([z.string(), z.null()]),
  confirmed: z.union([z.boolean(), z.null()]),
  blocked: z.union([z.boolean(), z.null()]),
  createdAt: z.union([z.date(), z.null()]),
  updatedAt: z.union([z.date(), z.null()]),
  dateOfBirth: z.union([z.date(), z.null()]),
  role: RoleSchema,
});

export type UserType = z.infer<typeof UserSchema>;

export const RegisterApiResponseTypeSchema = z.object({
  jwt: z.string(),
  user: UserSchema,
});
export type RegisterApiResponseType = z.infer<
  typeof RegisterApiResponseTypeSchema
>;

export type AuthApiResponseType = z.infer<typeof RegisterApiResponseTypeSchema>;
