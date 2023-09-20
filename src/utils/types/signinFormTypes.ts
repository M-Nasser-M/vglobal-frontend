import * as z from "zod";

export const SigninFormSchema = z.object({
  email: z.string().email().nonempty("email is required"),
  password: z.string().nonempty("password is required"),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;
