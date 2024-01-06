import createFetchApi from "@/createFetchApi";
import { serverENV } from "@/serverENV.mjs";

export const serverApiAuth = createFetchApi(serverENV.STRAPI_API_URL, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${serverENV.STRAPI_API_TOKEN}`,
  },
});

export const serverApi = createFetchApi(serverENV.STRAPI_API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});
