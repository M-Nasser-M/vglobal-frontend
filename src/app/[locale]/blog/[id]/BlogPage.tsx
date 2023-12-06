"use client";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { AspectRatio, Box, Heading } from "@chakra-ui/react";
import { Blog } from "@/utils/types/blogTypes";
import NextImage from "next/image";
import React from "react";

type Props = { blog: Blog };

const BlogPage = ({ blog }: Props) => {
  return (
    <Box as="article">
      <AspectRatio mb={2} w={"100%"} ratio={16 / 9}>
        <NextImage
          placeholder="blur"
          blurDataURL={blog.data.cover?.placeholder}
          loading="lazy"
          src={blog.data.cover?.formats?.large?.url || ""}
          alt={blog.data.cover?.alternativeText || "blog cover image"}
          fill
          sizes="100vw"
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
