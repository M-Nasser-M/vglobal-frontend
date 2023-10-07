import { getBookConsultArticleAndSEO } from "@/utils/services/bookConsultService";
import { locales } from "../../../../i18n";
import { Metadata } from "next";
import CalInlineEmbed from "./CalInlineEmbed";
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
  const response = await getBookConsultArticleAndSEO(locale);
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

const page = async ({ params }: Props) => {
  const locale = params.locale;
  const response = await getBookConsultArticleAndSEO(locale);
  const jsonLd = response?.data.seo?.structuredData;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      <CalInlineEmbed />
    </>
  );
};

export default page;
