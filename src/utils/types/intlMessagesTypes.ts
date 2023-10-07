import * as z from "zod";

export const SignupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
export type Signup = z.infer<typeof SignupSchema>;

export const SigninSchema = z.object({
  email: z.string(),
  password: z.string(),
  forgotPassword: z.string(),
});
export type Signin = z.infer<typeof SigninSchema>;

export const NavlinksSchema = z.object({
  "/": z.string(),
  "permenant-immigration": z.string(),
  visit: z.string(),
  study: z.string(),
  blog: z.string(),
  "about-us": z.string(),
  "book-consult": z.string(),
  assessment: z.string(),
});
export type Navlinks = z.infer<typeof NavlinksSchema>;

export const MessagesSchema = z.object({
  navlinks: NavlinksSchema,
  signin: SigninSchema,
  signup: SignupSchema,
});
export type Messages = z.infer<typeof MessagesSchema>;
