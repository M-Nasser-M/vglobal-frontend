import { getHomeArticleAndSEO } from "@/utils/services/homeService";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeo";
import { Metadata, ResolvingMetadata } from "next";
import NoContent from "@/components/NoContent";
import Home from "./Home";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type StaticProps = {
  params: { locale: string };
};

export async function generateMetadata(
  { params }: StaticProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lang = params.locale;
  const locale = lang ? String(lang) : "en";
  const response = await getHomeArticleAndSEO(locale);
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

export default async function RootPage({ params }: Props) {
  const locale = params.locale;

  const response = await getHomeArticleAndSEO(locale);
  const validateData = ArticleAndSeoSchema.safeParse(response);
  const jsonLd = response?.data.seo?.structuredData;
  if (validateData.success && response) {
    return (
      <>
        {jsonLd && typeof window !== "undefined" && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <Home article={response.data.article!} />
      </>
    );
  }
  return <NoContent />;
}
