import { serverApiAuth } from "./fetchApiServer";
import { Locale } from "@/i18n";
import qs from "qs";

export const getPrivacyPolicyArticleAndSeoo = async (locale: Locale) => {
  const query = qs.stringify({ locale });
  try {
    const response = await serverApiAuth.get(`/privacy-policy?${query}`);

    return response;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
