import React from "react";
import {
  Avatar,
  Flex,
  Box,
  Image,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import Action from "../components/Action";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../components/Comments";
const Postpage = () => {
  const [liked, setLiked] = React.useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar size={"md"} name="shahmeer" src="/avatar.jpg" />
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
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text fontSize={"sm"} my={3}>
        This is the post
      </Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/post1.jpg" w={"full"} />
      </Box>

      <Flex gap={3} my={1}>
        <Action liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.dark"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          32 replies
        </Text>
      </Flex>
      <Divider my={2} />
      <Flex gap={3} justify={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <Text color={"gray.light"}> 👏 </Text>
          <Text color={"gray.light"}> Get the app to like post and share</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={2} />
      <Comments 
       comment="kmalll so beautiful"
       createdAt="3d"
       likes ={190}
       username='john'
       userAvatar="https://bit.ly/prosper-baba"
      />
      <Comments 
       comment="woww so beautiful"
       createdAt="2d"
       likes ={200}
       username='shahmeer'
       userAvatar="https://bit.ly/code-beast"
      />
      <Comments 
       comment="looing great"
       createdAt="4d"
       likes ={104}
       username='jack'
       userAvatar="https://bit.ly/sage-adebayo"
      />
    </>
  );
};

export default Postpage;
