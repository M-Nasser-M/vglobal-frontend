// import * as z from "Zod";

export type ExtendedSession = {
  user: {
    name: string;
    email: string;
    image: string | null;
    id: number | string;
  };
  expires: Date;
  jwt: string;
} | null;

// export const UserSchema = z.object({
//   name: z.union([z.string(), z.null()]),
//   email: z.string(),
//   image: z.union([z.string(), z.null()]),
//   id: z.union([z.number(), z.string()]),
// });

// export const ExtendedSessionSchema = z.object({
//   user: UserSchema,
//   expires: z.coerce.date(),
//   jwt: z.string(),
// });
