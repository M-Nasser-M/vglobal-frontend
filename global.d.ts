type Messages = typeof import("./messages/en.json");
declare interface IntlMessages extends Messages {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_STRAPI_API_URL: string;
      NEXT_PUBLIC_STRAPI_URL: string;
      STRAPI_API_TOKEN: string;
      HOSTED_ZONE_NAME: string;
      CERTIFICATE_ARN: string;
      NEXTAUTH_SECRET: string;
      STRAPI_API_URL: string;
      HOSTED_ZONE_ID: string;
      NEXTAUTH_URL: string;
      STRAPI_URL: string;
    }
  }
}
