"use client";

import { sanitizeData } from "@/utils/other/sanitizeData";
import { Box } from "@chakra-ui/react";
import React from "react";

type Props = { html: string };

const HtmlContentWrapper = ({ html }: Props) => {
  const sanitizedHTML = sanitizeData(html);
  return <Box as={"article"} dangerouslySetInnerHTML={sanitizedHTML}></Box>;
};

export default HtmlContentWrapper;
