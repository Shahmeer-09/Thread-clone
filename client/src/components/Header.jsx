import { Flex, Image,useColorMode} from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAuthState from '../Atom/userAtom'
import { Link } from 'react-router-dom'
import {TbHome} from "react-icons/tb"
import {FaRegUserCircle} from "react-icons/fa"

const Header = () => {
    const{ toggleColorMode , colorMode} = useColorMode() 
    const user=  useRecoilValue(userAuthState)

  return (
    <Flex justifyContent={"space-around"} mt={6} mb={12} maxW={'620px'} mx={"auto"} > 
      {
          user && 
          <Link  to={'/'} >
             <TbHome fontSize={"23px"} />
          </Link>
      }
     <Image
       src={colorMode=="dark"? "/light-logo.svg" : "/dark-logo.svg"}
       cursor={"pointer"}
       onClick={toggleColorMode}
       w={6}
     />
     {
          user && 
          <Link  to={`${user.username}`} >
            <FaRegUserCircle fontSize={'23px'}/>
          </Link>
      }
    </Flex>
  )
}

export default Header