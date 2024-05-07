import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
const Loading = () => {
  return (
    <Flex mt={"30px"} justifyContent={"center"} alignItems={"center"}  >
       <Spinner  size='xl' />
    </Flex>
  )
}

export default Loading