import {
  getBlogWithID,
  getBlogsWithAllLocales,
} from "@/utils/services/blogService";
import { BlogSchema, BlogWithoutData } from "@/utils/types/blog";
import NoContent from "@/components/NoContent";
import BlogPage from "./BlogPage";
import React from "react";
import { Metadata } from "next";

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
type StaticProps = {
  params: { id: string; locale: string };
};

export async function generateMetadata({
  params,
}: StaticProps): Promise<Metadata> {
  const response = await getBlogWithID(params.id);
  const seo = response?.data.seo;
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalURL },
    robots: seo?.metaRobots,
    keywords: seo?.keywords,
    viewport: seo?.metaViewport,
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogsWithAllLocales(1, 100);
  const ids = blogs?.data.map((blog: BlogWithoutData) => {
    return { id: String(blog.id) };
  });

  let totalIds: {
    id: string;
  }[] = ids ? ids : [];

  if (
    blogs &&
    blogs.meta.pagination?.pageCount &&
    blogs.meta.pagination?.pageCount <= 1
  ) {
    return totalIds;
  }

  if (blogs && blogs.meta.pagination?.pageCount) {
    for (let i = 2; i <= blogs?.meta.pagination?.pageCount; i++) {
      const pageBlogs = await getBlogsWithAllLocales(i, 100);
      const ids = pageBlogs?.data.map((blog: BlogWithoutData) => {
        return { id: String(blog.id) };
      });
      totalIds = ids ? [...totalIds, ...ids] : totalIds;
    }
  }
  return totalIds;
}

const Page = async ({ params }: Props) => {
  const response = await getBlogWithID(params.id);
  const validateData = BlogSchema.safeParse(response);
  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && typeof window !== "undefined" && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <BlogPage blog={response} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
