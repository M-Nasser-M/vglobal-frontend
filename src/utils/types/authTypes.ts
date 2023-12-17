import { passwordStrength } from "check-password-strength";
import * as z from "zod";

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
        message:
          "Password needs to include number,capital letter, small letter,special character ",
      }),
    confirmPassword: z.string().nonempty("need to confirm password"),
    dateOfBirth: z
      .date()
      .refine((val) => new Date().getFullYear() - val.getFullYear() >= 16, {
        message: "You must be at least 16 years old",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;

export const SigninFormSchema = z.object({
  email: z.string().email("not an email format").nonempty("email is required"),
  password: z.string().nonempty("password is required"),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("not a valid email").nonempty("email is required"),
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;

export const PasswordResetFormSchema = z
  .object({
    code: z.string().nonempty("code is required"),
    password: z
      .string()
      .min(8, "must be at least 8 characters")
      .max(50, "max length is 50 characters")
      .refine((val) => passwordStrength(val).id >= 3, {
        message: "Password is weak ",
      }),
    confirmPassword: z.string().nonempty("need to confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword", "password"],
  });

export type PasswordResetFormType = z.infer<typeof PasswordResetFormSchema>;
