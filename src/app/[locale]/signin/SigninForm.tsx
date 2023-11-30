"use client";
import { SigninFormSchema, SigninFormType } from "@/utils/types/authTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@/components/Link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const SigninForm = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const t = useTranslations("signinForm");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormType>({ resolver: zodResolver(SigninFormSchema) });

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const onSubmit = async (data: SigninFormType) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push(redirectPath);
      router.refresh();
      if (res?.error) {
        setCredentialsError(true);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) console.error(error.message);
    }
  };
  return (
    <Container
      display="flex"
      minH="100vh"
      flexDirection="column"
      pb={4}
      justifyContent="center"
      alignItems="center"
      maxW="container.sm"
    >
      {redirectPath !== "/" && (
        <Heading color="red.500" mb="12">
          Pls SignIn First
        </Heading>
      )}
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            {...register("email")}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password">{t("password")}</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.root || credentialsError)}>
          <FormErrorMessage>
            {errors.root && errors.root.message}
            {credentialsError && "Invalid credentials"}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="red"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          {t("signin")}
        </Button>
        <Stack
          mt={4}
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Text>
            {t("don'tHaveAnAccount")}
            <Link color="red.400" href="/signup">
              {" "}
              {t("signup")}
            </Link>
          </Text>
          <Text>
            <Link color="red.400" href="/forgot-password">
              {t("forgotPassword")}
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default SigninForm;
