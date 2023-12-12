"use client";

import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex
      direction="column"
      gap={4}
      w="100%"
      justify="center"
      alignItems="center"
      mt={20}
    >
      <Heading as="h2">an Error occured!</Heading>
      <Text>{error.message}</Text>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Flex>
  );
}
