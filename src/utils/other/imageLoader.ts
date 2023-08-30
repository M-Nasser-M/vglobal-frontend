import { ImageLoaderProps } from "next/image";

export const strapiImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${src}?format=webp&width=${width}`;
};
