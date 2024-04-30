import React from "react";
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
  useToast
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
const Usercom = () => {
    const toast = useToast()
    const copyUrl =async () => {
        const url = window.location.href;
    navigator.clipboard.writeText(url).then(()=>{

        toast({
            title: 'Copied!.',
            description: "url copied to clip board.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
    })
   
        
    }
  return (
    <VStack gap={5} align={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}>John Stantion</Text>
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
          <Avatar name="john station" src="/avatar.jpg" size={"xl"} />
        </Box>
      </Flex>
      <Text> Owner and co-founder of hsl food products and the stark </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2k followers</Text>
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
                <MenuItem bg={"gray.dark"} onClick={copyUrl} >copy link</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"} >
          <Flex flex={"1"} justifyContent={"center"} cursor={"pointer"}  borderBottom={"1.5px solid"} pb={'3'} >
              <Text>Threads</Text>
          </Flex>
          <Flex flex={"1"} justifyContent={"center"} color={"gray"} cursor={"pointer"}  borderBottom={"1px solid gray"} pb={'3'} >
              <Text>Replies</Text>
          </Flex>
      </Flex>
    </VStack>
  );
};

export default Usercom;
