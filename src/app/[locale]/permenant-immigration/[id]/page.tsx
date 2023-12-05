import { PermenantImmigrationPageSchema } from "@/utils/types/permenantImmigrationPageTypes";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import NoContent from "@/components/NoContent";
import type { Locale } from "@/i18n";
import { Metadata } from "next";
import React from "react";
import {
  getPermenantImmigrationPageWithIdAndSEO,
  getPermenantImmigrationPagesWithAllLocales,
} from "@/utils/services/permenantImmigrationService";

type Props = {
  params: { id: string; locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await getPermenantImmigrationPageWithIdAndSEO(params.id);
  const seo = response?.data.seo;
  const twitter = seo?.metaSocial && getTwitter(seo?.metaSocial);
  const openGraph = seo?.metaSocial && getOpenGraph(seo?.metaSocial);
  return {
    metadataBase: new URL("https://www.vglobal.ca"),
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalURL },
    robots: seo?.metaRobots,
    keywords: seo?.keywords,
    twitter: twitter,
    openGraph: openGraph,
  };
}

export async function generateStaticParams() {
  const piPages = await getPermenantImmigrationPagesWithAllLocales(1, 100);
  const params = piPages?.data.map((piPage) => ({
    id: String(piPage.id),
    locale: piPage.locale,
  }));
  return params || [];
}

const Page = async ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const response = await getPermenantImmigrationPageWithIdAndSEO(params.id);
  const validateData = PermenantImmigrationPageSchema.safeParse(response);

  if (validateData.success) {
    const jsonLd = validateData.data.data.seo?.structuredData;
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HtmlContentWrapper html={validateData.data.data.article} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
