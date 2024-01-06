import { clientENV } from "@/clientENV.mjs";
import createFetchApi from "@/createFetchApi";

export const clientApi = createFetchApi(clientENV.NEXT_PUBLIC_STRAPI_API_URL, {
  headers: { "Content-Type": "application/json" },
});
