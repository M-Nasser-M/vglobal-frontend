type Props = { html: string };

const HtmlContentWrapper = ({ html }: Props) => {
  return <article dangerouslySetInnerHTML={{ __html: html }}></article>;
};

export default HtmlContentWrapper;
