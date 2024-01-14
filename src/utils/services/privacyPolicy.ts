import { serverApiAuth } from "./fetchApiServer";
import { Locale } from "@/i18n";
import qs from "qs";
import type { ArticleAndSeo } from "../types/articleAndSeoTypes";

export const getPrivacyPolicyArticleAndSeoo = async (locale: Locale) => {
  const query = qs.stringify({ locale });
  try {
    const response = await serverApiAuth.get<ArticleAndSeo>(
      `/privacy-policy?${query}`
    );

    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
