import type { HomeAndSeoType } from "../types/homeTypes";
import { FetchApiAuthGet } from "./fetchDefaults";
import qs from "qs";

export const getHomeArticleAndSEO = async (locale: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        seo: {
          populate: { metaImage: true, metaSocial: { populate: "image" } },
        },
        labelandtooltip: true,
      },
      locale,
    });

    const response = await FetchApiAuthGet<HomeAndSeoType>(
      `/home?${queryString}`
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
