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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useSetRecoilState } from 'recoil';
  import authScreen  from '../Atom/authAtoms';
 
import { Form } from 'react-router-dom';


  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setauthScreen =   useSetRecoilState(authScreen)
  
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
                    <Input type="text" name='name'/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl  isRequired >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" name='username' />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name='password' type={showPassword ? 'text' : 'password'} />
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
                type='submit'
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