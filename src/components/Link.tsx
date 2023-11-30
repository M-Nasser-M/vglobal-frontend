"use client";
import { useGetLocalFromPathname } from "@/utils/hooks/useGetLocalFromPathname";
import { Link as ChakraLink, type LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
} & LinkProps;

const Link = ({ children, href, ...props }: Props) => {
  const locale = useGetLocalFromPathname();
  return (
    <ChakraLink
      as={NextLink}
      textAlign={"center"}
      href={`/${locale}/${href}`}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
