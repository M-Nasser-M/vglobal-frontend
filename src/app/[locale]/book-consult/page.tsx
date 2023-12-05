import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { getBookConsultArticleAndSEO } from "@/utils/services/bookConsultService";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { type Locale } from "../../../i18n";
import CalInlineEmbed from "./CalInlineEmbed";
import { RevalidateDefaultTime } from "@/app/defaults";

type Props = {
  params: { locale: Locale };
};
export const revalidate = RevalidateDefaultTime;

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const response = await getBookConsultArticleAndSEO(locale);
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

const page = async ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const response = await getBookConsultArticleAndSEO(locale);
  const jsonLd = response?.data.seo?.structuredData;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      <Flex h="100vh">
        <CalInlineEmbed />
      </Flex>
    </>
  );
};

export default page;
