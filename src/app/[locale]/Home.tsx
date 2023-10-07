"use client";

import { HomeAndSeoType } from "@/utils/types/homeTypes";
import immigrate from "../../../public/immigrate.png";
import { BsInfoCircleFill } from "react-icons/bs";
import study from "../../../public/study.png";
import visit from "../../../public/visit.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

type Props = { HomeAndSeo: HomeAndSeoType };

const Home = ({ HomeAndSeo }: Props) => {
  const router = useRouter();
  return (
    <Stack
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading mb={10} fontWeight={600}>
        <Text fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} as={"span"}>
          Vglobal Immigration Inc.
        </Text>
        <Box as="br" />
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          Canadian Immigration Consultancy and Representation
        </Text>
      </Heading>
      <Heading fontWeight={600} lineHeight={"110%"}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          Start your immigration journey to Canada with a Free Assessment
        </Text>
      </Heading>
      <Button
        display="inline-block"
        colorScheme="red"
        variant="solid"
        size="lg"
        mb={5}
        onClick={() => {
          router.push("/signup");
        }}
      >
        Register
      </Button>
      <Heading fontWeight={600} lineHeight={"110%"}>
        <Text
          color="blue.500"
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          as={"span"}
        >
          Why Vglobal Immigration Inc.?
        </Text>
      </Heading>
      <Stack mb={10} direction="row">
        {HomeAndSeo.data.labelandtooltip?.map((item, index) => (
          <HStack key={index}>
            <Badge fontSize="xl" variant="outline" colorScheme="blue">
              <Text color="default-text" as="span">
                {item.label}
              </Text>
              <Tooltip label={item.tooltip} aria-label="A tooltip">
                <Box as="span">
                  <Icon
                    ml={1}
                    color="default-text"
                    display="inline-block"
                    aria-label="A tooltip"
                    as={BsInfoCircleFill}
                  />
                </Box>
              </Tooltip>
            </Badge>
          </HStack>
        ))}
      </Stack>
      <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
          Services
        </Text>
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={immigrate} alt="Immigrate" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              Immigrate
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.immigrate}
          </Text>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={visit} alt="visit" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              Visit
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.visit}
          </Text>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={4}
        >
          <Image src={study} alt="study" width={200} height={200} />
          <Heading color="blue.500" mb={4} fontWeight={600} lineHeight={"110%"}>
            <Text fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} as={"span"}>
              Study
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            {HomeAndSeo.data.study}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
