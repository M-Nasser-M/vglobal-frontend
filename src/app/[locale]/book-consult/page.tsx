import { getBookConsultArticleAndSEO } from "@/utils/services/bookConsultService";
import { Metadata, ResolvingMetadata } from "next";
import CalendlyWrapper from "./CalendlyWrapper";
import { locales } from "../../../../i18n";
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
  const response = await getBookConsultArticleAndSEO(locale);
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

const page = async ({ params }: Props) => {
  const locale = params.locale;
  const response = await getBookConsultArticleAndSEO(locale);
  const jsonLd = response?.data.seo?.structuredData;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      <CalendlyWrapper />
    </>
  );
};

export default page;
