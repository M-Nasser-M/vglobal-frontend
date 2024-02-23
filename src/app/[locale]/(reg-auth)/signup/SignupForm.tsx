"use client";
import { type SignupFormType, signupFormSchema } from "@/utils/types/authTypes";
import { registerUsingEmail } from "@/utils/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import type { signupformTranslations } from "../../../../../messages/messagesKeys";
import { atom, useAtom } from "jotai";

const emailExistErrorAtom = atom<boolean>(false);

type Props = { translations: signupformTranslations };
const SignupForm = ({ translations }: Props) => {
  const toast = useToast();
  const [emailExistError, setEmailExistError] = useAtom(emailExistErrorAtom);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({ resolver: zodResolver(signupFormSchema) });
  const router = useRouter();

  const onSubmit = async (data: SignupFormType) => {
    const res = await registerUsingEmail(data);

    if (res === null) setEmailExistError(true);
    if (res?.user) {
      toast({
        title: "Confirm Email",
        description: "Please Check your email to activate your account",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/email-confirmation");
    }
  };

  return (
    <Container
      display="flex"
      minH="100vh"
      pb={4}
      justifyContent="center"
      alignItems="center"
      maxW="container.sm"
      paddingTop="20"
    >
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.firstName)}>
          <FormLabel htmlFor="firstName">{translations.firstName}</FormLabel>
          <Input id="firstName" {...register("firstName")} />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.lastName)}>
          <FormLabel htmlFor="lastName">{translations.lastName}</FormLabel>
          <Input id="lastName" {...register("lastName")} />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.dateOfBirth)}>
          <FormLabel htmlFor="dateOfBirth">
            {translations.dateOfBirth}
          </FormLabel>
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="Select your date of birth"
            {...register("dateOfBirth", {
              required: "This is required",
              valueAsDate: true,
            })}
          />
          <FormErrorMessage>
            {errors.dateOfBirth && errors.dateOfBirth.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">{translations.email}</FormLabel>
          <Input id="email" type="email" {...register("email")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password">{translations.password}</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
          <FormLabel htmlFor="confirmPassword">
            {translations.confirmPassword}
          </FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={emailExistError}>
          <FormErrorMessage>
            {emailExistError && "Email Already Exists"}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="red"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          {translations.signup}
        </Button>
      </Box>
    </Container>
  );
};

export default SignupForm;
