import { Box } from "@chakra-ui/react";

type Props = { html: string };

const HtmlContentWrapper = ({ html }: Props) => {
  return (
    <Box
      as="article"
      mt={24}
      p={2}
      dangerouslySetInnerHTML={{ __html: html }}
    ></Box>
  );
};

export default HtmlContentWrapper;
