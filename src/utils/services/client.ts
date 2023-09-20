import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

const authApi = axios.create({
  baseURL: process.env.STRAPI_API_URL,
  headers: {
    Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
  },
});

export { publicApi, authApi };
