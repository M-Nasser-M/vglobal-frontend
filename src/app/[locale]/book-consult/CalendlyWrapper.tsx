"use client";
import { InlineWidget } from "react-calendly";
import React from "react";
import { AspectRatio, Box } from "@chakra-ui/react";

type Props = {};

const CalendlyWrapper = (props: Props) => {
  return (
    <AspectRatio ratio={16 / 9} maxW="100%" maxH="100%">
      <InlineWidget
        styles={{ height: "100%", width: "100%" }}
        url="https://calendly.com/m-nasser-15910/30min"
      />
    </AspectRatio>
  );
};

export default CalendlyWrapper;
