import type { SingleAndSeo } from "../types/seoSingleTypes";
import { FetchApiAuthGet } from "./fetchDefaultsServer";
import type { Blog, Blogs } from "../types/blogTypes";
import { locales, type Locale } from "@/i18n";
import qs from "qs";

export const getBlogMainSEO = async (locale: Locale) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      locale,
    });

    const response = await FetchApiAuthGet<SingleAndSeo>(
      `/blog-main?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getBlogPage = async (
  locale: Locale,
  page: number = 1,
  pageSize = 9
) => {
  try {
    const queryString = qs.stringify({
      populate: { cover: true },
      locale,
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await FetchApiAuthGet<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getBlogWithID = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
        cover: true,
      },
    });

    const response = await FetchApiAuthGet<Blog>(`/blogs/${id}?${queryString}`);

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getBlogsWithAllLocales = async (
  page: number = 1,
  pageSize = 9
) => {
  const locale = locales.map((locale) => {
    return { locale };
  });
  try {
    const queryString = qs.stringify({
      populate: { cover: true },
      ...locale,
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await FetchApiAuthGet<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
