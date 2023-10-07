import { SignupFormType } from "../types/authTypes";
import { publicApi } from "./client";
import {
  AuthApiResponseType,
  CredentialsType,
  RegisterApiResponseType,
} from "../types/userType";

const authUsingEmail = async (credentials: CredentialsType) => {
  if (!credentials?.email || !credentials?.password) return null;

  try {
    const { data } = await publicApi.post<AuthApiResponseType>("/auth/local", {
      identifier: credentials.email,
      password: credentials.password,
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

const registerUsingEmail = async (user: SignupFormType) => {
  if (!user?.email || !user?.password) return null;

  try {
    const { data } = await publicApi.post<RegisterApiResponseType>(
      "/auth/local/register",
      {
        username: `${user.firstName} ${user.lastName}`,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth.toISOString().split("T")[0],
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

const forgotPassword = async (email: string) => {
  if (!email) return null;

  try {
    const { data } = await publicApi.post("/auth/forgot-password", {
      email,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  if (!code || !password || !passwordConfirmation) return null;

  try {
    const { data } = await publicApi.post("/auth/reset-password", {
      code, // code contained in the reset link
      password,
      passwordConfirmation,
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export { authUsingEmail, registerUsingEmail, forgotPassword, resetPassword };
