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

const Comments = ({reply, lastReply}) => {
  return (
    <>
      <Flex py={2} my={2} gap={4} w={"full"}>
        <Avatar name="avatar" src={reply.userProfilePic} size={"md"} />
        <Flex w={"full"} gap={1} flexDirection={"column"}>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
               {reply.username}
            </Text>
          </Flex>
          <Text fontSize={"sm"}>{reply.text}</Text>  
        </Flex>
      </Flex>

     { !lastReply ? <Divider />:null}
    </>
  );
};

export default Comments;
