"use client";
import { BlogWithoutData } from "@/utils/types/blogTypes";
import Link from "@/components/Link";
import type { Locale } from "@/i18n";
import Image from "next/image";
import React from "react";
import {
  Box,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = { blog: BlogWithoutData; params: { locale: Locale } };

const BlogCard = ({ blog }: Props) => {
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
            src={blog.cover?.formats?.thumbnail?.url || ""}
            alt={blog.cover?.alternativeText || "blog cover image"}
            fill
            sizes="100vw"
          />
        </Box>
        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <Link href={`/blog/${blog.id}`}>
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
