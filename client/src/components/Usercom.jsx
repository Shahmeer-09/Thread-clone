import React, { useState } from "react";
import {
  VStack,
  Flex,
  Text,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import customFetch from "../utils/CustomFetch";
const Usercom = ({ user }) => {
  const currentuset = useRecoilValue(userAuthState);
  const [following, setFollowing] = useState(
    user.followers?.includes(currentuset?._id)
  );
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const copyUrl = async () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Copied!.",
        description: "url copied to clip board.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };
  const handleFollowunfollow =async()=>{
    if(loading)return
    try { 
       setLoading(true)
      const res = await customFetch.get(`/user/follow/${user._id}`)
      if(res.data?.success==false){
        toast({
          title: 'Error!.',
          description: res?.data?.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        setLoading(false)
      }
      if(following){
        user.followers.pop()
      }else{
        user.followers.push(currentuset?._id)
      }
      setFollowing(!following)
    } catch (error) {
       toast({
        title: 'Error!.',
        description: error?.response?.data?.message||error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,

      })
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }
  return (
    <VStack gap={5} align={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}> {user.username}</Text>
          <Flex gap={2} alignItems={"Center"}>
            <Text fontSize={"sm"}>JohnStantion</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilepic ? (
            <Avatar  src={user.profilepic} size={"xl"} />
          ) : (
            <Avatar  src="/avatar.jpg" size={"xl"} />
          )}
        </Box>
      </Flex>
      <Text>{user.bio} </Text>
      {currentuset?._id === user._id && (
        <Link className="btn" to={"/update"}>
          update
        </Link>
      )}
      {currentuset?._id !== user._id && (
        <button disabled={loading} onClick={handleFollowunfollow} className="btn" to={"/update"}>
          {  following ? "unfollow" : "follow"}
        </button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers?.length}followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link style={{ color: "#5c5a5a" }}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icons-container">
            <BsInstagram size={20} cursor={"pointer"} />
          </Box>
          <Box className="icons-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={20} cursor={"pointer"} />
              </MenuButton>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyUrl}>
                  copy link
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={"1"}
          justifyContent={"center"}
          cursor={"pointer"}
          borderBottom={"1.5px solid"}
          pb={"3"}
        >
          <Text>Threads</Text>
        </Flex>
        <Flex
          flex={"1"}
          justifyContent={"center"}
          color={"gray"}
          cursor={"pointer"}
          borderBottom={"1px solid gray"}
          pb={"3"}
        >
          <Text>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Usercom;
