import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import NoContent from "@/components/NoContent";
import type { Locale } from "@/i18n";
import { getPrivacyPolicyArticleAndSeoo } from "@/utils/services/privacyPolicy";
import { ArticleAndSeoSchema } from "@/utils/types/articleAndSeoTypes";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = { params: { locale: Locale } };

const Page = async ({ params }: Props) => {
  unstable_setRequestLocale(params.locale);
  const lang = params.locale;

  const response = await getPrivacyPolicyArticleAndSeoo(lang);

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
