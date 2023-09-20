import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { authApi } from "./client";
import qs from "qs";

export const getBookConsultArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await authApi.get<ArticleAndSeo>(
      `/book-consult?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
