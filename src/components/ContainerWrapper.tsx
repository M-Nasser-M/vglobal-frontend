"use client";
import { Container, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

const ContainerWrapper = ({ children }: Props) => {
  return (
    <Container minHeight="100vh" mt="18" mb="4" maxW="container.xl">
      <Suspense fallback={<Spinner size="xl" />}>{children}</Suspense>
    </Container>
  );
};

export default ContainerWrapper;
