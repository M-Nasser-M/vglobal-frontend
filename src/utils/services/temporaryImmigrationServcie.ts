import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { authApi } from "./client";
import qs from "qs";

export const getTemporaryImmigrationArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await authApi.get<ArticleAndSeo>(
      `/temporary-immigration?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
