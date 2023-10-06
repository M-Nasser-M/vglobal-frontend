import { getHomeArticleAndSEO } from "@/utils/services/homeService";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { HomeAndSeoSchema } from "@/utils/types/homeTypes";
import NoContent from "@/components/NoContent";
import { Metadata } from "next";
import Home from "./Home";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type StaticProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: StaticProps): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getHomeArticleAndSEO(locale);
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

export default async function RootPage({ params }: Props) {
  const locale = params.locale;
  const response = await getHomeArticleAndSEO(locale);
  const validateData = HomeAndSeoSchema.safeParse(response);

  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <Home HomeAndSeo={response} />
      </>
    );
  }
  return <NoContent />;
}
