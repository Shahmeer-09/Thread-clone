import React, { useEffect, useState } from "react";
import { Avatar, Flex, Box, Image, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Action from "./Action";
import { formatDistanceToNow } from "date-fns";
import customFetch from "../utils/CustomFetch";
import { FaTrashAlt } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import postAtom from "../Atom/postAtom";
import { set } from "mongoose";
const Actualpost = ({ feed, postedBy }) => {
  const navigate = useNavigate();
  const current = useRecoilValue(userAuthState);
  const toast = useToast();
  const [post, setpost] = useRecoilState(postAtom)
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
  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm(" Do you realy want to delete?  ")) {
        return;
      }
      const res = await customFetch.delete(`/post/deletePost/${feed?._id}`);
      if (res.data.success == false) {
        toast({
          title: "Error!.",
          description: res.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      toast({
        title: "success!.",
        description: res.data?.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setpost(post.filter((item) => item._id !== feed?._id) )
    } catch (error) {
      toast({
        title: "Error!.",
        description: error.response?.data?.message || error?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Link to={`/${owner.username}/post/${feed?._id}`}>
      <Flex gap={3} mb={5} py={5}>
        <Flex alignItems={"Center"} flexDirection={"column"}>
          <Avatar
            size={"md"}
            name="shah"
            src={owner.profilepic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${owner.username}`);
            }}
          />
          <Box width={"1px"} bg={"gray"} my={1} h={"full"}></Box>
          <Box position={"relative"}>
            {feed.replies.length === 0 && <h3>🥱</h3>}
            {feed.replies[0] && (
              <Avatar
                size={"xs"}
                name="shah"
                src={feed.replies[0].userProfilePic}
                position={"absolute"}
                top={"0"}
                left={"-10px"}
                p={"2px"}
              />
            )}
            {feed.replies[1] && (
              <Avatar
                size={"xs"}
                name="shah"
                src={feed.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0"}
                right={"-4px"}
                p={"2px"}
              />
            )}
            {feed.replies[2] && (
              <Avatar
                size={"xs"}
                name="shah"
                src={feed.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0"}
                left={"4px"}
                p={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${owner.username}`);
                }}
              >
                {owner.name}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"} mr={2}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(feed.createdAt))} ago
              </Text>
            </Flex>
            {current?._id == postedBy && (
              <FaTrashAlt fontSize={"16px"} onClick={handleDelete} />
            )}
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
            <Action feed={feed} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Actualpost;
