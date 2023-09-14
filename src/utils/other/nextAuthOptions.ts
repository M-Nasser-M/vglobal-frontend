import createAccountUsingEmail from "../services/authService";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { AuthOptions, User } from "next-auth";
import api from "@/utils/services/client";
import { JWT } from "next-auth/jwt";

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await createAccountUsingEmail(credentials);
          if (data) {
            return { ...data.user, jwt: data.jwt };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      const extendedSession = {
        ...session,
        user: { ...session.user, id: token.id },
        jwt: token.jwt,
      };

      return extendedSession;
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await api.get<{
          jwt: JWT;
          user: User | AdapterUser;
        }>(
          `/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        );

        token.jwt = response.data.jwt;
        token.id = response.data.user.id;
      }
      return token;
    },

    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
