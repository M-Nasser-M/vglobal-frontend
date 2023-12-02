import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { getStudyArticleAndSEO } from "@/utils/services/studyService";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import { type Locale, locales } from "../../../i18n";
import { Metadata } from "next";
import React from "react";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: Locale };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getStudyArticleAndSEO(locale);
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

  const response = await getStudyArticleAndSEO(lang);

  const validateData = ArticleAndSeoSchema.safeParse(response);

  if (validateData.success) {
    const jsonLd = validateData.data.data.seo?.structuredData;
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HtmlContentWrapper html={validateData.data.data.article!} />
      </>
    );
  }

  return <NoContent />;
};

export default Page;
