import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@chakra-ui/react";
import Logoutbtn from "../components/Logoutbtn";
import { useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import Createpost from "../components/Createpost";
import Loading from "../components/Loading";


const Layout = () => {
  const current = useRecoilValue(userAuthState);
 
  return (
    <>
      <Header />
      <Logoutbtn />
      <Container maxW={"640px"}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      {current && <Createpost />}
    </>
  );
};

export default Layout;
