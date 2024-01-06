import type { ArticleAndSeo } from "../types/articleAndSeoTypes";
import { serverApiAuth } from "./fetchApiServer";
import { locales, type Locale } from "@/i18n";
import qs from "qs";
import type {
  PermenantImmigrationPage,
  PermenantImmigrationPages,
} from "../types/permenantImmigrationPageTypes";

export const getPermenantImmigrationArticleAndSEO = async (locale: Locale) => {
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

    const response = await serverApiAuth.get<PermenantImmigrationPages>(
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

    const response = await serverApiAuth.get<PermenantImmigrationPage>(
      `/permenant-immigration-pages/${id}?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getPermenantImmigrationPagesLocalised = async (locale: Locale) => {
  try {
    const queryString = qs.stringify({
      locale,
    });

    const response = await serverApiAuth.get<PermenantImmigrationPages>(
      `/permenant-immigration-pages?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
