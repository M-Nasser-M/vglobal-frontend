import * as z from "zod";
import { passwordStrength } from "check-password-strength";
export const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "must be at least 2 characters")
      .max(30, "max length is 30 characters"),
    lastName: z
      .string()
      .min(2, "must be at least 2 characters")
      .max(30, "max length is 30 characters"),
    email: z.string().email("invalid email"),
    password: z
      .string()
      .min(8, "must be at least 8 characters")
      .max(50, "max length is 50 characters")
      .refine((val) => passwordStrength(val).id >= 3, {
        message: "Password is weak ",
        path: ["password"],
      }),
    confirmPassword: z
      .string()
      .min(8, "must be at least 8 characters")
      .max(50, "max length is 50 characters"),
    dateOfBirth: z
      .date()
      .refine((val) => new Date().getFullYear() - val.getFullYear() >= 16, {
        message: "You must be at least 16 years old",
        path: ["dateOfBirth"],
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;
