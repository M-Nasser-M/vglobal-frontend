import {
  getBlogWithSlug,
  getBlogsWithAllLocales,
} from "@/utils/services/blogService";
import NoContent from "@/components/NoContent";
import BlogPage from "./BlogPage";

import { Metadata } from "next";
import { BlogsSchema } from "@/utils/types/blogTypes";
import { getOpenGraph, getTwitter } from "@/utils/other/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

type Props = {
  params: { slug: string; locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await getBlogWithSlug(params.slug);
  const seo = response?.data[0].seo;
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

export async function generateStaticParams() {
  const blogs = await getBlogsWithAllLocales(1, 100);
  const params = blogs?.data.map((blog) => ({
    slug: blog.slug,
    locale: blog.locale,
  }));
  return params || [];
}

const Page = async ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const response = await getBlogWithSlug(params.slug);

  const validateData = BlogsSchema.safeParse(response);

  if (validateData.success) {
    const jsonLd = validateData.data.data[0].seo?.structuredData;
    return (
      <>
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
        <BlogPage blog={validateData.data.data[0]} />
      </>
    );
  }

  return <NoContent />;
};

export default Page;
