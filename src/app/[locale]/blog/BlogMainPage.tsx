"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { PaginationButton } from "@/components/pagination";
import { createQueryString } from "@/utils/other/utils";
import { Blogs } from "@/utils/types/blogTypes";
import BlogCard from "./BlogCard";
import React from "react";

type Props = { blogs: Blogs; currentPage: number; params: { locale: string } };

const BlogMainPage = ({ blogs, currentPage, params }: Props) => {
  const pageCount = blogs.meta.pagination?.pageCount || 1;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (pageNo: number) => {
    router.push(
      pathname + "?" + createQueryString("page", pageNo, searchParams)
    );
  };

  return (
    <>
      <SimpleGrid mt="28" columns={{ lg: 3, sm: 1, md: 2 }} spacing={4}>
        {blogs.data.map((blog) => (
          <BlogCard params={params} key={blog.id} blog={blog} />
        ))}
      </SimpleGrid>
      {pageCount > 1 && (
        <Stack
          direction={{ base: "column", sm: "row" }}
          as="nav"
          aria-label="Pagination"
          spacing={2}
          w="full"
          justify="center"
          alignItems="center"
          py={10}
          mt={{ base: 3, md: 0 }}
        >
          <Box>
            <PaginationButton
              onclick={() => navigate(currentPage - 1)}
              isDisabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
          </Box>
          <Stack direction="row" spacing={2}>
            {[...Array(pageCount)].map((e, i) => (
              <PaginationButton
                onclick={() => navigate(i + 1)}
                isActive={i + 1 === currentPage}
                key={i}
              >
                {i + 1}
              </PaginationButton>
            ))}
          </Stack>
          <Box>
            <PaginationButton
              onclick={() => navigate(currentPage + 1)}
              isDisabled={currentPage === pageCount}
            >
              Next
            </PaginationButton>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default BlogMainPage;
