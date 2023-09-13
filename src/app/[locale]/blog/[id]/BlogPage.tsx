"use client";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { AspectRatio, Box, Heading } from "@chakra-ui/react";
import { Blog } from "@/utils/types/blog";
import NextImage from "next/image";
import React from "react";
import { strapiImageLoader } from "@/utils/other/imageLoader";

type Props = { blog: Blog };

const BlogPage = ({ blog }: Props) => {
  return (
    <Box as="article">
      <AspectRatio mb={2} w={"100%"} ratio={16 / 9}>
        <NextImage
          placeholder="blur"
          blurDataURL={blog.data.cover?.placeholder}
          loading="lazy"
          loader={strapiImageLoader}
          src={blog.data.cover?.url || ""}
          alt={blog.data.cover?.alternativeText || "blog cover image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
        />
      </AspectRatio>
      <Heading width={"100%"} textAlign={"center"} mb={4} as="h1">
        {blog.data.title}
      </Heading>
      <HtmlContentWrapper html={blog.data.article} />
    </Box>
  );
};

export default BlogPage;
