import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { authApi } from "./client";
import qs from "qs";

export const getStudyArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      locale,
    });

    const response = await authApi.get<ArticleAndSeo>(`/study?${queryString}`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};