import { ArticleAndSeo } from "../types/articleAndSeo";
import api from "./client";
import qs from "qs";

export const getBookConsultArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await api.get<ArticleAndSeo>(
      `/book-consult?${queryString}`,
      {
        headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
