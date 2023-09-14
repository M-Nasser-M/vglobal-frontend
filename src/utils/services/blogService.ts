import { SingleAndSeo } from "../types/seoSingleTypes";
import { Blog, Blogs } from "../types/blogTypes";
import api from "./client";
import qs from "qs";
import { locales } from "../../../i18n";

export const getBlogMainSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" } },
      locale,
    });

    const response = await api.get<SingleAndSeo>(`/blog-main?${queryString}`, {
      headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
    });

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

    const response = await api.get<Blogs>(`/blogs?${queryString}`, {
      headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getBlogWithID = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: { seo: { populate: "metaImage" }, cover: true },
    });

    const response = await api.get<Blog>(`/blogs/${id}?${queryString}`, {
      headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
    });

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

    const response = await api.get<Blogs>(`/blogs?${queryString}`, {
      headers: { Authorization: `bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};
