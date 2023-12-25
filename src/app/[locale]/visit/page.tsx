import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { getVisitArticleAndSEO } from "@/utils/services/visitService";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import NoContent from "@/components/NoContent";
import { type Locale } from "@/i18n";
import { Metadata } from "next";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getVisitArticleAndSEO(locale);
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

const Page = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const response = await getVisitArticleAndSEO(locale);
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
