import { getPermenantImmigrationArticleAndSEO } from "@/utils/services/permenantImmigrationService";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { Metadata } from "next";
import NoContent from "@/components/NoContent";
import { locales } from "../../../../i18n";
import React from "react";

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
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalURL },
    robots: seo?.metaRobots,
    keywords: seo?.keywords,
    viewport: seo?.metaViewport,
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
        {jsonLd && typeof window !== "undefined" && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HtmlContentWrapper html={response.data.article!} />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
