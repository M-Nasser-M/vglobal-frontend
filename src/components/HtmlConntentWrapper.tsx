type Props = { html: string };

const HtmlContentWrapper = ({ html }: Props) => {
  return (
    <article
      style={{ marginTop: "5rem", marginBottom: "1rem" }}
      dangerouslySetInnerHTML={{ __html: html }}
    ></article>
  );
};

export default HtmlContentWrapper;
