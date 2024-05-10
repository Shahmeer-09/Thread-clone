import React, { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";
import userAuthState from "../Atom/userAtom";
import { Navigate, Outlet } from "react-router-dom";
const Pirvate = () => {
  const user = useRecoilValue(userAuthState);
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/auth"} />;
  }
};

export default Pirvate;
