"use client";
import { strapiImageLoader } from "@/utils/other/imageLoader";
import { BlogWithoutData } from "@/utils/types/blog";
import Image from "next/image";
import React from "react";
import {
  Box,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

type Props = { blog: BlogWithoutData; params: { locale: string } };

const BlogCard = ({ blog, params }: Props) => {
  const lang = params.locale;
  return (
    <>
      <Box
        borderWidth="1px"
        _hover={{ shadow: "lg" }}
        rounded="md"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Box h={"210px"} m={0} p={0} pos={"relative"}>
          <Image
            placeholder="blur"
            blurDataURL={blog.cover?.placeholder}
            loading="lazy"
            loader={strapiImageLoader}
            src={blog.cover?.formats.medium.url || ""}
            alt={blog.cover?.alternativeText || "blog cover image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Box>
        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <Link href={`/${lang}/blog/${blog.id}`}>
              <Heading
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                lineHeight="1.2"
                mb={2}
              >
                {blog.title}
              </Heading>
            </Link>
            <Tooltip label={blog.description}>
              <Text
                fontSize={{ base: "md", sm: "lg" }}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                noOfLines={3}
              >
                {blog.description}
              </Text>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogCard;
