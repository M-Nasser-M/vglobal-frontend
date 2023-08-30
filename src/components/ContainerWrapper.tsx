"use client";
import { Container, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

const ContainerWrapper = ({ children }: Props) => {
  return (
    <Container maxW="container.xl" mt={10}>
      <Suspense fallback={<Spinner size="xl" />}>{children}</Suspense>
    </Container>
  );
};

export default ContainerWrapper;
