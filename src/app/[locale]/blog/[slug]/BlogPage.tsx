"use client";
import { AspectRatio, Box, Heading } from "@chakra-ui/react";
import type { BlogData } from "@/utils/types/blogTypes";
import NextImage from "next/image";

type Props = { blog: BlogData };

const BlogPage = ({ blog }: Props) => {
  return (
    <Box mt={24} as="article">
      <AspectRatio mb={2} w={"100%"} ratio={16 / 9}>
        <NextImage
          placeholder="blur"
          blurDataURL={blog.cover?.placeholder}
          loading="lazy"
          src={blog.cover?.formats?.large?.url || ""}
          alt={blog.cover?.alternativeText || "blog cover image"}
          fill
          sizes="100vw"
        />
      </AspectRatio>
      <Heading
        textTransform="uppercase"
        width={"100%"}
        textAlign={"center"}
        mb={4}
        as="h1"
      >
        {blog.title}
      </Heading>
      <Box
        as="article"
        mt={5}
        p={4}
        dangerouslySetInnerHTML={{ __html: blog.article }}
      ></Box>
    </Box>
  );
};

export default BlogPage;
