import { ImageLoaderProps } from "next/image";

export const strapiImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return `http://127.0.0.1:1337${src}?format=webp&width=${width}`;
};
