import { getBlogMainSEO, getBlogPage } from "@/utils/services/blogService";
import { Metadata } from "next";
import NoContent from "@/components/NoContent";
import BlogMainPage from "./BlogMainPage";
import React from "react";
import { BlogsSchema } from "@/utils/types/blogTypes";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import type { Locale } from "@/i18n";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};
type StaticProps = {
  params: { locale: Locale };
};

export async function generateMetadata({
  params,
}: StaticProps): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getBlogMainSEO(locale);
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

const Page = async ({ params, searchParams }: Props) => {
  const lang = params.locale;
  const { page } = searchParams;

  const pageNo = page && !Number.isNaN(page) ? Number(page) : 1;

  const response = await getBlogPage(lang ? lang : "en", pageNo);
  const validateData = BlogsSchema.safeParse(response);
  const seoResponse = await getBlogMainSEO(lang);
  const jsonLd = seoResponse?.data.seo?.structuredData;

  if (validateData.success && response) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <BlogMainPage params={params} currentPage={pageNo} blogs={response} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
