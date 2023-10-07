import Credentials from "next-auth/providers/credentials";
import { authUsingEmail } from "../services/authService";
import { publicApi } from "@/utils/services/client";
import { AdapterUser } from "next-auth/adapters";
import { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const options: AuthOptions = {
  providers: [
    Credentials({
      name: "email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await authUsingEmail(credentials);
          if (data) {
            return {
              ...data.user,
              jwt: data.jwt,
              id: String(data.user.id),
            };
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
      const extendedUser = { jwt: "", ...user };
      if (isSignIn && account?.provider == "credentials") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.jwt = extendedUser.jwt;
        token.id = user.id;
        return token;
      }
      if (isSignIn) {
        try {
          const response = await publicApi.get<{
            jwt: JWT;
            user: User | AdapterUser;
          }>(
            `/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          );

          token.jwt = response.data.jwt;
          token.id = response.data.user.id;
        } catch (error) {
          console.error("Error in jwt callback:");
        }
      }
      return token;
    },
  },
};
