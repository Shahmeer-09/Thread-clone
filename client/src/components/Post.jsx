import React, { useState } from "react";
import { Avatar, Flex, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Action from "./Action";
import {BsThreeDots} from 'react-icons/bs'
const Post = ({likes, replies, postimage, posttitle}) => {
    const [liked, setLiked] = useState(false)
  return (
    <Link to={"/shah/post/1"}>
      <Flex gap={3} mb={5} py={5}  >
        <Flex alignItems={"Center"} flexDirection={"column"}>
          <Avatar size={"md"} name="shah" src="/avatar.jpg" />
          <Box width={"1px"} bg={"gray"} my={1} h={"full"}></Box>
          <Box position={"relative"}>
            <Avatar
              size={"xs"}
              name="shah"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              top={"0"}
              left={"-10px"}
              p={"2px"}
            />
            <Avatar
              size={"xs"}
              name="shah"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              bottom={"0"}
              right={"-4px"}
              p={"2px"}
            />
            <Avatar
              size={"xs"}
              name="shah"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0"}
              left={"4px"}
              p={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                smilga
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                1d
              </Text>
              <BsThreeDots/>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{posttitle}</Text>

          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={postimage} w={"full"} />
          </Box>

          <Flex gap={3} my={1}>
            <Action liked={liked} setLiked={setLiked} />
          </Flex>

        <Flex gap={2} alignItems={"center"} >
          <Text color={"gray.light"}  fontSize={"sm"} >{likes + (liked? 1: 0) } likes </Text>
          <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.dark"} ></Box>
          <Text color={"gray.light"} fontSize={"sm"} >{replies} replies</Text>

        </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
