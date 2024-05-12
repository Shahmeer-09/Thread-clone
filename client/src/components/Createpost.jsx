import { useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Textarea,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  CloseButton,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

import ImagePrev from "../hooks/ImagePrev";
import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import customFetch from "../utils/CustomFetch";
import { useRecoilState, useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import postAtom from "../Atom/postAtom";

var MAX_CHARS = 500;
const Createpost = () => {
  const authuser = useRecoilValue(userAuthState);
  const toast = useToast();
  const imagref = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleprev, imageurl, setimageURl } = ImagePrev();
  const [text, setText] = useState("");
  const [loading , isloading] = useState(false)
  const [posts, setposts] = useRecoilState(postAtom)
   const regex=/^(?:http?:\/\/)?[^\/\?#]+(?<!\/post)\/([^?#]+)(?!\/post)/
   const url = window.location.href
  const handleTextchange = async (e) => {
    const textValue = e.target.value;
    if (textValue.length <= MAX_CHARS) {
      setText(textValue);
    }
  };
  const handlepost = async () => {
    
    try {
        isloading(true)
      const res = await customFetch.post(`/post/createPost`, {
        postedBy: authuser._id,
        text: text,
        img: imageurl,
      });
      if (res.data.success === false) {
        toast({
          title: "Error!.",
          description: res?.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        isloading(false)
      }
      toast({
        title: "Success!.",
        description: res.data?.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      const data = res?.data?.data
       setposts([data ,...posts])
    } catch (error) {
        toast({
            title: "Error!.",
            description: error?.response?.data?.message || error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        });
        isloading(false)
    } finally {
        isloading(false)
        onClose()
        setText("")
        setimageURl("")
    }
  };
  
  return (

      <>
      <Button
        position={"fixed"}
        bottom={4}
        right={4}
        leftIcon={<AddIcon />}
        fontSize={"small"}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Enter your post"
                onChange={handleTextchange}
                value={text}
              />

              <Text
                fontSize={"xs"}
                color={"gray.500"}
                m={1}
                fontWeight={"bold"}
              >
                {MAX_CHARS - text.length}/{MAX_CHARS}
              </Text>

              <Input type="file" hidden ref={imagref} onChange={handleprev} />
              <BsFillImageFill
                fontSize={"22px"}
                style={{ paddingLeft: "5px", cursor: "pointer" }}
                onClick={() => imagref.current.click()}
              />
            </FormControl>
            {imageurl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageurl} alt="image selevted" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setimageURl("");
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlepost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </> 

  );
};

export default Createpost;
