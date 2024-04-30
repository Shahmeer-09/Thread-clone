import { Flex, Image,useColorMode, useColorModeValue} from '@chakra-ui/react'
import React from 'react'
const Header = () => {
    const{ toggleColorMode , colorMode} = useColorMode() 

  return (
    <Flex justifyContent={"center"} mt={6} mb={12} > 
     <Image
       src={colorMode=="dark"? "/light-logo.svg" : "/dark-logo.svg"}
       cursor={"pointer"}
       onClick={toggleColorMode}
       w={6}
     />
    </Flex>
  )
}

export default Header