/* eslint-disable @typescript-eslint/no-namespace */
import * as z from "zod";

const EnvVariable = z.object({
  STRAPI_API_TOKEN: z.string(),
  NEXT_PUBLIC_STRAPI_API_URL: z.string(),
  NEXT_PUBLIC_STRAPI_URL: z.string(),
  STRAPI_API_URL: z.string(),
  STRAPI_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
});

EnvVariable.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvVariable> {}
  }
}
