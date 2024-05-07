import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
const ImagePrev = () => {
  const [imageurl, setimageURl] = useState(null);
  const toast = useToast()
  const handleprev = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setimageURl(reader.result);
        };
    }else{
     toast({
        title: "provide an image",
        status: "error",
        duration: 2000,
        isClosable: true,
     })
    }
  };
  return { handleprev, imageurl, setimageURl };
};

export default ImagePrev;
