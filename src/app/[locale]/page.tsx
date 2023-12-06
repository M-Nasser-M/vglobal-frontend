import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { homeKeys, homeTranslations } from "../../../messages/messagesKeys";
import { getHomeArticleAndSEO } from "@/utils/services/homeService";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { HomeAndSeoSchema } from "@/utils/types/homeTypes";
import NoContent from "@/components/NoContent";
import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import Home from "./Home";

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getHomeArticleAndSEO(locale);
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

export default async function RootPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const t = await getTranslations("home");
  const translations = homeKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as homeTranslations);
  const response = await getHomeArticleAndSEO(locale);
  const validateData = HomeAndSeoSchema.safeParse(response);

  if (validateData.success) {
    const jsonLd = validateData.data.data.seo?.structuredData;
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}

        <Home
          HomeAndSeo={validateData.data}
          params={{ locale }}
          translations={translations}
        />
      </>
    );
  }
  return <NoContent />;
}
