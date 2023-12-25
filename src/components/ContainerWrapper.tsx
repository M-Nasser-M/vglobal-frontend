"use client";
import { Container } from "@chakra-ui/react";

type Props = { children: React.ReactNode };

const ContainerWrapper = ({ children }: Props) => {
  return (
    <Container marginTop="lg" minHeight="100vh" maxW="container.xl">
      {children}
    </Container>
  );
};

export default ContainerWrapper;
