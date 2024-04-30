import React from "react";
import Usercom from "../components/Usercom";
import Post from "../components/Post";
const Userpage = () => {
  return (
    <>
      <Usercom />
      <Post likes={35} replies={120} postimage= {'/post1.jpg'} posttitle="this is what it is" />
      <Post likes={45} replies={430} postimage= {'/post2.jpg'} posttitle="the tranquile of conspire" />
      <Post likes={25} replies={220} postimage= {'/post3.jpg'} posttitle="One of the modest design" />
      
    </>
  );
};

export default Userpage;
