import {
  getBlogWithID,
  getBlogsWithAllLocales,
} from "@/utils/services/blogService";
import NoContent from "@/components/NoContent";
import BlogPage from "./BlogPage";
import React from "react";
import { Metadata } from "next";
import { BlogSchema, BlogWithoutData } from "@/utils/types/blogTypes";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: { id: string; locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};
type StaticProps = {
  params: { id: string; locale: Locale };
};

export async function generateMetadata({
  params,
}: StaticProps): Promise<Metadata> {
  const response = await getBlogWithID(params.id);
  const seo = response?.data.seo;
  const twitter = seo?.metaSocial && getTwitter(seo?.metaSocial);
  const openGraph = seo?.metaSocial && getOpenGraph(seo?.metaSocial);
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalURL },
    robots: seo?.metaRobots,
    keywords: seo?.keywords,
    viewport: seo?.metaViewport,
    twitter: twitter,
    openGraph: openGraph,
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
  unstable_setRequestLocale(params.locale);
  const response = await getBlogWithID(params.id);
  const validateData = BlogSchema.safeParse(response);
  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <BlogPage blog={response} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
