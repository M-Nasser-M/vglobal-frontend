import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import api from "./client";
import qs from "qs";

export const getTemporaryImmigrationArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await api.get<ArticleAndSeo>(
      `/temporary-immigration?${queryString}`,
      {
        headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
