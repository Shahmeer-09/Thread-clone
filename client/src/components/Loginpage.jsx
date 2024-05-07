import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreen from "../Atom/authAtoms";
import userAuthState from "../Atom/userAtom";
import { redirect, useNavigate } from "react-router-dom";

import customFetch from "../utils/CustomFetch";

export default function Loginpage() {
const toast = useToast()
const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const setauthScreen = useSetRecoilState(authScreen);
  const setuser  = useSetRecoilState(userAuthState)
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {

    try {
      const response = await customFetch.post('/user/login', formState)
       const data = response?.data?.data
       localStorage.setItem("user-info",JSON.stringify(data))
       console.log(data)
       setuser(data)
       toast(
        {
            title: "success",
            description:response?.data?.message,
            status:"success",
            duration: 5000,
            isClosable: true,
        }
    )
        navigate("/")
    } catch (error) {
      console.log(error.response?.data?.message)
      toast({
        title: 'Error!.',  
        description: error?.response?.data?.message|| error.message,
        status:"error",
        duration: 2000,
        isClosable: true,
      }) 
      return
    }
  }; 
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={4} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    username: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      password: e.target.value,
                    });
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don`t hve a account?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => {
                    setauthScreen(false);
                  }}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
