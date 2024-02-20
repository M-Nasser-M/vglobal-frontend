import type { ReadonlyURLSearchParams } from "next/navigation";
import type { MetaSocial } from "../types/seoTypes";
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const createQueryString = (
  name: string,
  value: string | number,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, String(value));

  return params.toString();
};

export const getTwitter = (metasocial: MetaSocial[]): Twitter | null => {
  for (const network of metasocial) {
    if (network.socialNetwork === "Twitter") {
      return {
        title: network.title,
        description: network.description,
        images: network.image?.url,
      };
    }
  }
  return null;
};

export const getOpenGraph = (metasocial: MetaSocial[]): OpenGraph | null => {
  for (const network of metasocial) {
    if (network.socialNetwork !== "Twitter") {
      return {
        title: network.title,
        description: network.description,
        images: network.image?.url,
      };
    }
  }
  return null;
};
