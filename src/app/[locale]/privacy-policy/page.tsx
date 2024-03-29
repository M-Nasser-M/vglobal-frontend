import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import type { Locale } from "@/i18n";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { getPrivacyPolicyArticleAndSeoo } from "@/utils/services/privacyPolicy";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = { params: { locale: Locale } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getPrivacyPolicyArticleAndSeoo(locale);
  const seo = response?.data.seo;
  const twitter = seo?.metaSocial && getTwitter(seo.metaSocial);
  const openGraph = seo?.metaSocial && getOpenGraph(seo.metaSocial);
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

  const response = await getPrivacyPolicyArticleAndSeoo(locale);

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
