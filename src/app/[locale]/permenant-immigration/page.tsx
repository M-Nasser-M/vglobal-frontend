import { getPermenantImmigrationArticleAndSEO } from "@/utils/services/permenantImmigrationService";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import { locales } from "../../../../i18n";
import { Metadata } from "next";
import React from "react";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type StaticProps = {
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: StaticProps): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getPermenantImmigrationArticleAndSEO(locale);
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

const Page = async ({ params }: Props) => {
  const lang = params.locale;
  const response = await getPermenantImmigrationArticleAndSEO(lang);
  const validateData = ArticleAndSeoSchema.safeParse(response);
  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HtmlContentWrapper html={response.data.article!} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
