"use client";
import { Container } from "@chakra-ui/react";
import React from "react";

type Props = { children: React.ReactNode };

const ContainerWrapper = ({ children }: Props) => {
  return (
    <Container maxW="container.xl" mt={10}>
      {children}
    </Container>
  );
};

export default ContainerWrapper;
