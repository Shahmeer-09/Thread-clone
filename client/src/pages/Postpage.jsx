import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import {
  Avatar,
  Flex,
  Box,
  Image,
  Text,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import getUserbyname from "../hooks/getUserbyname";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import customFetch from "../utils/CustomFetch";
import Action from "../components/Action";
import { FaTrashAlt } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import { useNavigate } from "react-router-dom";
import postAtom from "../Atom/postAtom";
const Postpage = () => {
  const { user, loading } = getUserbyname();
  const [post, setpost] = useRecoilState(postAtom);
  const current = useRecoilValue(userAuthState);
  const toast = useToast();
  const navigate = useNavigate();
  const { pid } = useParams();
  useEffect(() => {
    const GetPost = async () => {
      try {
        const res = await customFetch.get(`/post/getpost/${pid}`);
        const data = res?.data?.data;
        if (res.data?.success === false) {
          toast({
            title: "Error!.",
            description: res.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }

        setpost([data]);
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
    GetPost();
  }, [pid]);
  console.log(post);
  const handleDel = async () => {
    try {
      if (!window.confirm(" Do you realy want to delete?  ")) {
        return;
      }
      const res = await customFetch.delete(`/post/deletePost/${post?._id}`);
      if (res.data.success == false) {
        toast({
          title: "Error!.",
          description: res.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        navigate(`/${user.username}`);
      }
      toast({
        title: "success!.",
        description: res.data?.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(`/${user.username}`);
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
  console.log(post[0]);
  const currentpost = post[0];

  if (!currentpost) return;
  console.log(currentpost.replies);
  return (
    <>
      {loading && !user && <Loading />}
      {!loading && user && post && (
        <>
          <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
              <Avatar size={"md"} name="shahmeer" src={user.porfilepublic} />
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              ></Text>
            </Flex>
            {current?._id === user._id && (
              <FaTrashAlt
                cursor={"pointer"}
                fontSize={"16px"}
                onClick={handleDel}
              />
            )}
          </Flex>

          <Text fontSize={"sm"} my={3}>
            {currentpost.text}
          </Text>

          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={currentpost.img} w={"full"} />
          </Box>

          <Flex gap={3} my={1}>
            <Action feed={currentpost} />
          </Flex>
          <Divider my={2} />
          <Flex gap={3} justify={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
              <Text color={"gray.light"}> 👏 </Text>
              <Text color={"gray.light"}>
                {" "}
                Get the app to like post and share
              </Text>
            </Flex>
            <Button>Get</Button>
          </Flex>
          <Divider my={2} />
          {currentpost?.replies?.map((reply) => (
            <Comments
              key={reply._id}
              reply={reply}
              lastReply={
                reply._id ===
                currentpost.replies[currentpost.replies?.length - 1]._id
              }
            />
          ))}
        </>
      )}
    </>
  );
};

export default Postpage;
