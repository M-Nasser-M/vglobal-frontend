import { Metadata, ResolvingMetadata } from "next";
import Home from "./Home";
import { getHomeArticleAndSEO } from "@/utils/services/homeService";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeo";
import NoContent from "@/components/NoContent";
import { locales } from "../../../i18n";
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
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <Home article={response.data.article!} />
      </>
    );
  }
  return <NoContent />;
}
