import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import { Metadata } from "next";
import React from "react";
import {
  PermenantImmigrationPageData,
  PermenantImmigrationPageSchema,
} from "@/utils/types/permenantImmigrationPageTypes";
import {
  getPermenantImmigrationPageWithIdAndSEO,
  getPermenantImmigrationPagesWithAllLocales,
} from "@/utils/services/permenantImmigrationService";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";

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
  const response = await getPermenantImmigrationPageWithIdAndSEO(params.id);
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
  const piPages = await getPermenantImmigrationPagesWithAllLocales(1, 100);
  const ids = piPages?.data.map((piPage: PermenantImmigrationPageData) => {
    return { id: String(piPage.id) };
  });

  let totalIds: {
    id: string;
  }[] = ids ? ids : [];

  if (
    piPages &&
    piPages.meta.pagination?.pageCount &&
    piPages.meta.pagination?.pageCount <= 1
  ) {
    return totalIds;
  }

  if (piPages && piPages.meta.pagination?.pageCount) {
    for (let i = 2; i <= piPages?.meta.pagination?.pageCount; i++) {
      const piPages = await getPermenantImmigrationPagesWithAllLocales(i, 100);
      const ids = piPages?.data.map((piPage: PermenantImmigrationPageData) => {
        return { id: String(piPage.id) };
      });
      totalIds = ids ? [...totalIds, ...ids] : totalIds;
    }
  }
  return totalIds;
}

const Page = async ({ params }: Props) => {
  const response = await getPermenantImmigrationPageWithIdAndSEO(params.id);
  const validateData = PermenantImmigrationPageSchema.safeParse(response);
  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HtmlContentWrapper html={response?.data.article} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
