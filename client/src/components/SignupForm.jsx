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
    useToast
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useRecoilState, useSetRecoilState } from 'recoil';
  import authScreen  from '../Atom/authAtoms';
 
import { Form } from 'react-router-dom';
import customFetch from '../utils/CustomFetch';
  

  export default function SignupCard() {
    const toast = useToast()
    const [signState, setSignState] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const setauthScreen =   useSetRecoilState(authScreen)
   const handleSignup =async ()=>{
      try {
         const response= await customFetch.post('/user/signup', signState)
         toast({
          title: 'success!.',
          description: `${response?.data?.message}. Now please login `,
          status:"success",
          duration: 2000,
          isClosable: true,
        }) 
         setauthScreen(true)

      } catch (error) {
        toast({
          title: 'Error!.',
          description: error.response?.data?.message,
          status:"error",
          duration: 2000,
          isClosable: true,
        }) 
        return
      }
   }
    return (

      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Form
          method='post'
          >

        
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text"
                    onChange={(e)=> setSignState({ ...signState, name:e.target.value }) }
        />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl  isRequired >
                    <FormLabel>Username</FormLabel>
                    <Input type="text"  
                     onChange={(e)=> setSignState({ ...signState, username:e.target.value }) }
    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" 
                 onChange={(e)=> setSignState({ ...signState, email:e.target.value }) } />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name='password' type={showPassword ? 'text' : 'password'}
                   onChange={(e)=> setSignState({ ...signState, password:e.target.value }) }
     />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}

                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSignup}
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue('gray.600',"gray.700" )}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('gray.700', "gray.800"),
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={()=>{
                    setauthScreen(true)
                  }} >Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
          </Form>
        </Stack>
      </Flex>
    );
  }