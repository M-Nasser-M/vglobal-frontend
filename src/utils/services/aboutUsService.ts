import type { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { serverApiAuth } from "./fetchApiServer";
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

    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/about-us?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
