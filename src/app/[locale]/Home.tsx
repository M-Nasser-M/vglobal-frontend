"use client";
import HtmlContentWrapper from "@/components/HtmlConntentWrapper";
import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

type Props = { article: string };

const Home = ({ article }: Props) => {
  return (
    <Stack
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        <Text as={"span"} color={"green.400"}>
          Vglobal Immigration
          <br />
        </Text>
      </Heading>
      <Text as={"span"} fontSize={{ base: "md", sm: "lg", md: "xl" }}>
        <HtmlContentWrapper html={article} />
      </Text>
    </Stack>
  );
};

export default Home;
