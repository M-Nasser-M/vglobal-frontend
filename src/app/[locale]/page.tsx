import { getHomeArticleAndSEO } from "@/utils/services/homeService";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { HomeAndSeoSchema } from "@/utils/types/homeTypes";
import NoContent from "@/components/NoContent";
import type { Metadata } from "next";
import Home from "./Home";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    twitter: twitter,
    openGraph: openGraph,
  };
}

export default async function RootPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["home"],
    queryFn: () => getHomeArticleAndSEO(locale),
  });
  const response = queryClient.getQueryData(["home"]);
  const validateData = HomeAndSeoSchema.safeParse(response);

  if (validateData.success) {
    const jsonLd = validateData.data.data.seo?.structuredData;
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Home params={{ locale }} />
        </HydrationBoundary>
      </>
    );
  }
  return <NoContent />;
}
