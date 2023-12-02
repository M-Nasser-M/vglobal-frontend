import type { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { FetchApiAuthGet } from "./fetchDefaults";
import type { Locale } from "@/i18n";
import qs from "qs";

export const getAboutUsArticleAndSEO = async (locale: Locale) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      locale,
    });

    const response = await FetchApiAuthGet<ArticleAndSeo>(
      `/about-us?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
