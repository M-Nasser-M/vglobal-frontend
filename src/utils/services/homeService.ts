import { HomeAndSeoType } from "../types/homeTypes";
import { authApi } from "./client";
import qs from "qs";

export const getHomeArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" }, labelandtooltip: true },
      locale,
    });

    const response = await authApi.get<HomeAndSeoType>(`/home?${queryString}`, {
      headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
