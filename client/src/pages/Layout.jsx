import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import customFetch from "../utils/CustomFetch";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate()
  customFetch.interceptors.response.use((response) => response, (error)=>{
    if(error?.response?.status === 401){
       navigate('/auth')
    }
  })
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};

export default Layout;
