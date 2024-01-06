import type { SingleAndSeo } from "../types/seoSingleTypes";
import type { Blog, Blogs } from "../types/blogTypes";
import { locales, type Locale } from "@/i18n";
import qs from "qs";
import { serverApiAuth } from "./fetchApiServer";

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

    const response = await serverApiAuth.get<SingleAndSeo>(
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
      populate: ["cover"],
      locale,
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await serverApiAuth.get<Blogs>(`/blogs?${queryString}`);

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

    const response = await serverApiAuth.get<Blog>(
      `/blogs/${id}?${queryString}`
    );

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

    const response = await serverApiAuth.get<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

export const getBlogWithSlug = async (slug: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
        cover: true,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
    });

    const response = await serverApiAuth.get<Blogs>(`/blogs?${queryString}`);

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
