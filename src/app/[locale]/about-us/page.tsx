import { getAboutUsArticleAndSEO } from "@/utils/services/aboutUsService";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeo";
import React from "react";
import NoContent from "@/components/NoContent";
import { Metadata, ResolvingMetadata } from "next";
import { locales } from "../../../../i18n";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams(props: Props) {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getAboutUsArticleAndSEO(locale);
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
  const response = await getAboutUsArticleAndSEO(lang);
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
