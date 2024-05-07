import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import customFetch from "../utils/CustomFetch"; 
import {TbLogout} from "react-icons/tb"
import userAuthState from "../Atom/userAtom";
const Logoutbtn = () => {
  const toast = useToast();
  const navigate = useNavigate();
 const value=   useRecoilValue(userAuthState);
  const setUser = useSetRecoilState(userAuthState);
  const handleLogout = async () => {
    try {
      const response = await customFetch("/user/logout");
      console.log(response);
      setUser("");
      navigate("/auth");
      toast({
        title: "Success",
        description: response?.data?.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.removeItem("user-info");
      setUser(null);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };
  return (
    <>
    {
      value ? (
        
        <Button top={3} position={"fixed"} right={4} onClick={handleLogout}>
          <TbLogout/>
        </Button> 
      ): null
    }
    </>
  );
};
export default Logoutbtn;
