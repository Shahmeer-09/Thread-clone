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
const Comments = ({username, userAvatar, likes, createdAt, comment}) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <>
      <Flex py={2} my={2} gap={4} w={"full"}>
        <Avatar name="avatar" src={userAvatar} size={"md"} />
        <Flex w={"full"} gap={1} flexDirection={"column"}>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
               {username}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createdAt}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{comment}</Text>
          <Action liked={liked} setLiked={setLiked} />
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes + (liked ? 1 : 0)} likes
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.dark"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              200 replies
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comments;
