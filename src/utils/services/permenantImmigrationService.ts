import { AxiosError } from "axios";
import { ArticleAndSeo } from "../types/articleAndSeo";
import api from "./client";
import qs from "qs";

export const getPermenantImmigrationArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await api.get<ArticleAndSeo>(
      `/permenant-immigration?${queryString}`,
      {
        headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );

    return response.data;
  } catch (error: AxiosError | any) {
    console.error(error.message);
  }
};