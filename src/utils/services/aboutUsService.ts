import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { authApi } from "./client";
import qs from "qs";

export const getAboutUsArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      locale,
    });

    const response = await authApi.get<ArticleAndSeo>(
      `/about-us?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
