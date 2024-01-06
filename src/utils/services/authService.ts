import { type SignupFormType } from "../types/authTypes";
import type {
  AuthApiResponseType,
  CredentialsType,
  RegisterApiResponseType,
} from "../types/userType";
import { clientApi } from "./fetchApiClient";

export const authUsingEmail = async (credentials: CredentialsType) => {
  if (!credentials?.email || !credentials?.password) return null;

  try {
    const data = await clientApi.post<AuthApiResponseType>("/auth/local", {
      identifier: credentials.email,
      password: credentials.password,
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
    return null;
  }
};

export const registerUsingEmail = async (user: SignupFormType) => {
  try {
    const data = await clientApi.post<RegisterApiResponseType>(
      "/auth/local/register",
      {
        username: `${user.firstName} ${user.email} ${user.lastName}`,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const data = await clientApi.post("/auth/forgot-password", {
      email,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    const data = await clientApi.post("/auth/reset-password", {
      code, // code contained in the reset link
      password,
      passwordConfirmation,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const resendConfirmationEmail = async (email: string) => {
  try {
    const data = await clientApi.post("/auth/send-email-confirmation", {
      email,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
