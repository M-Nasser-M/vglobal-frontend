import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverENV = createEnv({
  server: {
    STRAPI_API_TOKEN: z.string().min(1),
    STRAPI_API_URL: z.string().url(),
    STRAPI_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});
