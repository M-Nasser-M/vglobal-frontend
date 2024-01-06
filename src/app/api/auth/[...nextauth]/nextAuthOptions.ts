import { authUsingEmail } from "@/utils/services/authService";
import Credentials from "next-auth/providers/credentials";
import type { AdapterUser } from "next-auth/adapters";
import type { AuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { serverApi } from "@/utils/services/fetchApiServer";

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
            if (!data.user.confirmed)
              throw new Error("User Email not Confirmed");

            if (data.user.blocked) throw new Error("User Is Blocked");

            const userToken = {
              ...data.user,
              jwt: data.jwt,
              id: String(data.user.id),
            };

            return userToken;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof Error) console.error(error.message);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      //edit here to get more info in get session callback token has alot more info
      const extendedToken = { user: { username: "" }, ...token };
      const extendedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: extendedToken.user.username,
        },
        jwt: token.jwt,
      };
      return extendedSession;
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = user ? true : false;

      if (isSignIn && account?.provider == "credentials") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.user = user;
        token.id = user.id;
        return token;
      }
      if (isSignIn) {
        try {
          const response = await serverApi.get<{
            jwt: JWT;
            user: User | AdapterUser;
          }>(
            `/auth/${account?.provider}/callback?access_token=${account?.access_token}`
          );
          token.jwt = response.jwt;
          token.id = response.user.id;
        } catch (error) {
          console.error("Error in jwt callback:");
        }
      }
      return token;
    },
  },
};
