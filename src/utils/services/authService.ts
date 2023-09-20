import {
  AuthApiResponseType,
  CredentialsType,
  RegisterApiResponseType,
} from "../types/userType";
import { SignupFormType } from "../types/signupFormTypes";
import { publicApi } from "./client";

const authUsingEmail = async (credentials: CredentialsType) => {
  if (!credentials?.email || !credentials?.password) return null;

  try {
    const { data } = await publicApi.post<AuthApiResponseType>("/auth/local", {
      identifier: credentials.email,
      password: credentials.password,
    });
    console.log(data);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

const registerUsingEmail = async (user: SignupFormType) => {
  if (!user?.email || !user?.password) return null;

  try {
    const { data } = await publicApi.post<RegisterApiResponseType>(
      "auth/local/register",
      {
        username: `${user.firstName} ${user.lastName}`,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export { authUsingEmail, registerUsingEmail };
