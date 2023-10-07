import { SingleAndSeo } from "../types/seoSingleTypes";
import { Blog, Blogs } from "../types/blogTypes";
import { authApi } from "./client";
import qs from "qs";
import { locales } from "../../../i18n";

export const getBlogMainSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
      },
      locale,
    });

    const response = await authApi.get<SingleAndSeo>(
      `/blog-main?${queryString}`
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getBlogPage = async (
  locale: string,
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

    const response = await authApi.get<Blogs>(`/blogs?${queryString}`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
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

    const response = await authApi.get<Blog>(`/blogs/${id}?${queryString}`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
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

    const response = await authApi.get<Blogs>(`/blogs?${queryString}`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
