import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import customFetch from "../utils/CustomFetch";
const getUserbyname = () => {
  const [user, setuser] = useState("");
  const [loading, setloading] = useState(false);
  const { username } = useParams();
  const toast = useToast();
  useEffect(() => {
    const getUSer = async () => {
      try {
        setloading(true);
        const res = await customFetch.get(`/user/Profile/${username}`);
        const data = res?.data?.data;
        if (res?.data?.success === false) {
          toast({
            title: "Error!.",
            description: res.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setloading(false);
        }
        setloading(false);
        setuser(data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error!.",
          description: error?.response?.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
      }
    };
    getUSer()
  },[username]);
  return {user, loading}
};

export default getUserbyname;
