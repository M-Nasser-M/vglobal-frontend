"use client";

import { sanitizeData } from "@/utils/other/sanitizeData";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const ScaleFade = dynamic(
  () => import("@chakra-ui/react").then((components) => components.ScaleFade),
  { ssr: false }
);

type Props = { html: string };

const HtmlContentWrapper = ({ html }: Props) => {
  const sanitizedHTML = sanitizeData(html);
  return (
    <ScaleFade
      in={sanitizedHTML.__html ? true : false}
      initialScale={0.9}
      delay={0.1}
    >
      <Box as={"article"} dangerouslySetInnerHTML={sanitizedHTML}></Box>
    </ScaleFade>
  );
};

export default HtmlContentWrapper;
