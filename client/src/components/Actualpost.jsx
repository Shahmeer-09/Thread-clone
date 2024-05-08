import React, { useEffect, useState } from "react";
import { Avatar, Flex, Box, Image, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Action from "./Action";
import { BsThreeDots } from "react-icons/bs";
import customFetch from "../utils/CustomFetch";
const Actualpost = ({ feed, postedBy }) => {
    const toast = useToast()
  const [liked, setLiked] = useState(false);
  const [owner, setowner] = useState("");
  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await customFetch(`/user/Profile/${postedBy}`);
        const data = response?.data?.data;
        setowner(data);
        if (response.data.success === false) {
          toast({
            title: "Error!.",
            description: response?.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error!.",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
    getOwner();
  }, []);
  return (
    <Link to={""}>
      <Flex gap={3} mb={5} py={5}>
        <Flex alignItems={"Center"} flexDirection={"column"}>
          <Avatar size={"md"} name="shah" src={owner.profilepic} />
          <Box width={"1px"} bg={"gray"} my={1} h={"full"}></Box>
          <Box position={"relative"}>
            {feed.replies.length === 0 && <h3>🥱</h3> }
        
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
                {owner.name}
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

          <Text fontSize={"sm"}>{feed.text}</Text>

          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={feed.img} w={"full"} />
          </Box>

          <Flex gap={3} my={1}>
            <Action liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {feed?.likes?.length + (liked ? 1 : 0)} likes{" "}
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.dark"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {0} replies
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Actualpost;
