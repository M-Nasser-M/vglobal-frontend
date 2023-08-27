import { getBlogMainSEO, getBlogPage } from "@/utils/services/blogService";
import { BlogsSchema } from "@/utils/types/blog";
import { Metadata, ResolvingMetadata } from "next";
import NoContent from "@/components/NoContent";
import { locales } from "../../../../i18n";
import BlogMainPage from "./BlogMainPage";
import React from "react";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
type StaticProps = {
  params: { locale: string };
};

export async function generateStaticParams(props: StaticProps) {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: StaticProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getBlogMainSEO(locale);
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
