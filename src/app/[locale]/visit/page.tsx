import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { getVisitArticleAndSEO } from "@/utils/services/visitService";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import NoContent from "@/components/NoContent";
import { type Locale, locales } from "@/i18n";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { locale: Locale };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getVisitArticleAndSEO(locale);
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
  unstable_setRequestLocale(params.locale);
  const lang = params.locale;
  const response = await getVisitArticleAndSEO(lang);
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
