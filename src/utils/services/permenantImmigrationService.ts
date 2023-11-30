import type { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { FetchApiAuthGet } from "./fetchDefaults";
import { locales } from "../../i18n";
import qs from "qs";
import type {
  PermenantImmigrationPage,
  PermenantImmigrationPages,
} from "../types/permenantImmigrationPageTypes";

export const getPermenantImmigrationArticleAndSEO = async (locale: string) => {
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
      `/permenant-immigration?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
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
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      ...locale,
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await FetchApiAuthGet<PermenantImmigrationPages>(
      `/permenant-immigration-pages?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getPermenantImmigrationPageWithIdAndSEO = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
    });

    const response = await FetchApiAuthGet<PermenantImmigrationPage>(
      `/permenant-immigration-pages/${id}?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getPermenantImmigrationPagesLocalised = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      locale,
    });

    const response = await FetchApiAuthGet<PermenantImmigrationPages>(
      `/permenant-immigration-pages?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
