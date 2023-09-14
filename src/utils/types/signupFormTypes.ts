import { z } from "zod";
import { passwordStrength } from "check-password-strength";
export const signupFormSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    dateOfBirth: z.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => passwordStrength(data.password).id >= 3, {
    message: "Password is weak ",
    path: ["password"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;
