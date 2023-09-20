"use client";
import React, { ReactNode } from "react";
import { useColorModeValue, Button } from "@chakra-ui/react";

interface PaginationButtonProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onclick?: () => void;
}

const PaginationButton = ({
  children,
  isDisabled,
  isActive,
  onclick,
}: PaginationButtonProps) => {
  const activeStyle = {
    bg: useColorModeValue("gray.500", "gray.700"),
    color: "white",
  };

  return (
    <Button
      onClick={onclick}
      isDisabled={isDisabled}
      py={1}
      px={3}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      rounded="md"
      _hover={(!isDisabled && activeStyle) || undefined}
      cursor={(isDisabled && "not-allowed") || "pointer"}
      {...(isActive && activeStyle)}
    >
      {children}
    </Button>
  );
};

export { PaginationButton };
