import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientENV = createEnv({
  client: {
    NEXT_PUBLIC_STRAPI_API_URL: z.string().url(),
    NEXT_PUBLIC_STRAPI_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
});
