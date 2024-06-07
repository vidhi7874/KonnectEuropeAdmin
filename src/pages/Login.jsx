import {
  Box,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { login_page_img } from "../assets/images/";
import { Checkbox } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../features/auth/loginApiSlice";
import ThrowErrors from "../services/throwErrors";
import { localStorageService } from "../services/localStorge.service";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

const Login = () => {
  const [
    loginData,
    {
      data: myLoginData,
      error: getmyLoginDataApiErr,
      isLoading: getmyLoginDataApiIsLoading,
    },
  ] = useLoginMutation();
  const [credentials, setCredentials] = useState("password,email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission state
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (credentials) => {
    try {
      setIsSubmitting(true);
      console.log("credentials ", credentials);
      const res = await loginData(credentials).unwrap();
      console.log("getMyPerformances res ---> ", res);
      if(res.token.access){
          localStorageService.set("KE_ADMIN", {token  : res.token.access})
          window.location.href = "/";
      }

    } catch (error) {
      console.log("error --> ", error);

      ThrowErrors(error?.data?.message, error?.status);
    } finally {
      setIsSubmitting(false); // Set submission state back to false after API call completes
    }
  };

  const onSubmit = (data) => {
    // Perform your submit logic here
    console.log(data);
    onLogin(data);
  };
  // useEffect(() => {
  //   console.log("day ---> ",)
  //   loginAuthentication();
  // }, []);
  return (
    <Box>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box
          backgroundColor={"FormBackground"}
          w={{ base: "100%", md: "50%" }}
          h={{ base: "70vh", md: "100vh" }}
        >
          <Center>
            <Image
              src={login_page_img}
              alt="login Image"
              w={{ base: "80%", md: "60%" }}
              h={{ base: "40%", md: "70%" }}
              position="absolute"
              top={{ base: "8", md: "28" }}
            />
          </Center>
        </Box>

        <Container maxW="md" mt={{ md: "12" }}>
          <Box>
            <FormControl p={{ base: "4", md: "0" }}>
              <Box my={{ base: "10", md: "14" }}>
                <Heading
                  fontSize={{ base: "lg", md: "2xl" }}
                  color={"secondary"}
                >
                  Welcome to Konnect europe
                </Heading>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box my={{ base: "4", md: "4" }}>
                  <FormLabel color={"loginText"}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email address"
                    color={"placeholderLogin"}
                    w={{ base: "100%" }}
                    borderColor={errors.email ? "red" : "Boxborder"}
                    {...register("email")}
                  />
                  {errors.email && (
                    <Text color="red" fontSize="sm">
                      {errors.email.message}
                    </Text>
                  )}
                </Box>
                <Box my={{ base: "4", md: "4" }}>
                  <FormLabel color={"loginText"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      w={{ base: "100%" }}
                      borderColor={errors.password ? "red" : "Boxborder"}
                      {...register("password")}
                    />
                    <InputRightElement>
                      {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                      ) : (
                        <FaEye onClick={handleTogglePassword} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="red" fontSize="sm">
                      {errors.password.message}
                    </Text>
                  )}
                </Box>

                <Box mb={{ base: "8", md: "6" }}>
                  <Checkbox
                    colorScheme="primary"
                    //variant={'primary'}
                    // nested={{
                    //   "a": { color: "#0000EE" },
                    //   "a:visited": { color: "#551A8B;" },
                    // }}
                    // sx={{
                    //   _checked: (backgroundColor = "red"),
                    // }}
                    color={"checkboxfont"}
                    fontFamily={"DM Sans"}
                    fontWeight="bold"
                  >
                    Remember this device
                  </Checkbox>
                </Box>

                <Box>
                  <Button
                    backgroundColor="secondary"
                    w={{ base: "100%" }}
                    color="white"
                    type="submit"
                    _hover={""}
                    isLoading={isSubmitting} // Use the isSubmitting state to control the loading state of the button
                    loadingText="Signing In..." // Optional: Customize the loading text
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            </FormControl>
          </Box>
        </Container>

        {/* <Box color={"secondary"}>
          <Heading fontSize={"xl"}>Welcome to Konnect europe </Heading>

          <FormControl>
            <FormLabel color={"loginText"}>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email address"
              color={"placeholderLogin"}
              w={{ base: "xs" }}
            />
            <FormLabel color={"loginText"}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              w={{ base: "xs" }}
            />

            <Checkbox
              colorScheme="primary"
              color={"checkboxfont"}
              fontFamily={"DM Sans"}
              fontWeight="bold"
            >
              Remember this device
            </Checkbox>
            <Button colorScheme="red" w={{ base: "xs" }}>
              Sign In
            </Button>
          </FormControl>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default Login;
