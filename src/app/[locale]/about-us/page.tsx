import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { getAboutUsArticleAndSEO } from "@/utils/services/aboutUsService";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { type Locale } from "../../../i18n";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getAboutUsArticleAndSEO(locale);
  const seo = response?.data.seo;
  const twitter = seo?.metaSocial && getTwitter(seo?.metaSocial);
  const openGraph = seo?.metaSocial && getOpenGraph(seo?.metaSocial);
  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    alternates: { canonical: seo?.canonicalURL },
    robots: seo?.metaRobots,
    keywords: seo?.keywords,

    twitter: twitter,
    openGraph: openGraph,
  };
}

const Page = async ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const lang = params.locale;
  const response = await getAboutUsArticleAndSEO(lang);
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
