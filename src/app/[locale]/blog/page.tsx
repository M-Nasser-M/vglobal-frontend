import NoContent from "@/components/NoContent";
import { type Locale } from "@/i18n";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { getBlogMainSEO, getBlogPage } from "@/utils/services/blogService";
import { BlogsSchema } from "@/utils/types/blogTypes";
import { Metadata } from "next";
import BlogMainPage from "./BlogMainPage";
import { RevalidateDefaultTime } from "@/app/defaults";

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};
type StaticProps = {
  params: { locale: Locale };
};

export const revalidate = RevalidateDefaultTime;

export async function generateMetadata({
  params: { locale },
}: StaticProps): Promise<Metadata> {
  const response = await getBlogMainSEO(locale);
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

const Page = async ({ params, searchParams }: Props) => {
  const lang = params.locale;
  const { page } = searchParams;

  const pageNo = page && !Number.isNaN(page) ? Number(page) : 1;

  const response = await getBlogPage(lang, pageNo);
  const validateData = BlogsSchema.safeParse(response);
  const seoResponse = await getBlogMainSEO(lang);
  const jsonLd = seoResponse?.data.seo?.structuredData;

  if (validateData.success && validateData.data.data.length > 0) {
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <BlogMainPage
          params={params}
          currentPage={pageNo}
          blogs={validateData.data}
        />
      </>
    );
  }
  return <NoContent />;
};

export default Page;
