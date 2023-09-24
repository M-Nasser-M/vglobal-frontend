import {
  PermenantImmigrationPage,
  PermenantImmigrationPages,
} from "../types/permenantImmigrationPageTypes";
import { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { locales } from "../../../i18n";
import { authApi } from "./client";
import qs from "qs";

export const getPermenantImmigrationArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await authApi.get<ArticleAndSeo>(
      `/permenant-immigration?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

//permenant-immigration-pages
export const getPermenantImmigrationPagesWithAllLocales = async (
  page: number,
  pageSize: number
) => {
  const locale = locales.map((locale) => {
    return { locale };
  });
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      ...locale,
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await authApi.get<PermenantImmigrationPages>(
      `/permenant-immigration-pages?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getPermenantImmigrationPageWithIdAndSEO = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
    });

    const response = await authApi.get<PermenantImmigrationPage>(
      `/permenant-immigration-pages/${id}?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
