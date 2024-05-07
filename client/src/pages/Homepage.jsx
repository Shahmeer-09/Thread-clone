import React, { useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";



const Homepage = () => {
   const value= useRecoilValue(userAuthState)
   console.log(value)
  return(
    <Link to={"/shahmeer01"}>
    <Flex justifyContent={"center"} w={"full"}>
      <Button>Homepage</Button>
    </Flex>
  </Link>
  )
};

export default Homepage;
