import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <Link to={"/shahmeer"}>
      <Flex justifyContent={"center"} w={"full"}>
        <Button>Homepage</Button>
      </Flex>
    </Link>
  );
};

export default Homepage;
