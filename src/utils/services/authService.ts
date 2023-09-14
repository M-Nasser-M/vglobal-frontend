import api from "./client";

type credentials =
  | {
      email: string;
      password: string;
    }
  | undefined;

const createAccountUsingEmail = async (credentials: credentials) => {
  if (!credentials?.email || !credentials?.password) return null;
  const { data } = await api.post(
    "/auth/local",
    {
      identifier: credentials.email,
      password: credentials.password,
    },
    { headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` } }
  );

  return data;
};

export default createAccountUsingEmail;
