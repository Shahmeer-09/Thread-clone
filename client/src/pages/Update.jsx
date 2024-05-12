import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import { useRef, useState } from "react";
import ImagePrev from "../hooks/ImagePrev";
import customFetch from "../utils/CustomFetch";
export default function UpdateUser() {
  const toast = useToast()
  const imagref = useRef(null)
  const {handleprev, imageurl} = ImagePrev()
  const [userVal, setUser] = useRecoilState(userAuthState);
  const [loading, setisloading] = useState(false)
  const [updatestate, setpdateState] = useState({
    name:userVal.name,
    username: userVal.username,
    email: userVal.email,
    bio:userVal.bio
  })
 const handlesubmit =async(e)=>{
    e.preventDefault()
    if(loading) return
    try {
       setisloading(true)
       const res = await customFetch.put(`/user/update/${userVal._id}`, {
        ...updatestate,
        profilepic: imageurl || ""
       })
       const newdata = res.data?.data
       toast({
        title: 'updated!.',
        description: "updated successfully",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
       if(res.data?.success==false){
        toast({
          title: 'Error!.',
          description: res.data?.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        setisloading(false)
      }
      localStorage.setItem("user-info", JSON.stringify(newdata))
       console.log(newdata)
      setUser(newdata)
       setisloading(false)
  
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error!.',
        description: error.response?.data?.message|| error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setisloading(false)
      return
    }
 }
  return (
    <form onSubmit={handlesubmit}>
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.dark")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile update
        </Heading>
        <FormControl id="userName">
          <FormLabel>User avatar</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src= {imageurl || userVal.profilepic} />
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=> imagref.current.click()} >Change Avatat</Button>
              <input type="file" hidden ref={imagref} onChange={handleprev} />
            </Center>
          </Stack>
        </FormControl>
        <FormControl >
          <FormLabel>Full name</FormLabel>
          <Input
          value={updatestate.name}
          onChange={(e) => setpdateState({ ...updatestate, name: e.target.value })}
            placeholder="Full name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl >
          <FormLabel>User name</FormLabel>
          <Input
            value={updatestate.username}
            onChange={(e) => setpdateState({ ...updatestate, username: e.target.value })}    
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl>
        <FormControl >
          <FormLabel>Email address</FormLabel>
          <Input
            value={updatestate.email}
            onChange={(e) => setpdateState({ ...updatestate, email: e.target.value })}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            value={updatestate.bio}
              onChange={(e) => setpdateState({ ...updatestate, bio: e.target.value })}
            placeholder="Bio"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"green.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "green.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
          >
            {
              loading ? "updating..." : "Update"
            }
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  );
}
