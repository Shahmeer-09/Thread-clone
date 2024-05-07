import React, { useEffect, useState } from "react";
import Usercom from "../components/Usercom";
import Post from "../components/Post";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import Loading from "../components/Loading";

const Userpage = () => {
  const { username } = useParams();
  const [user, setuser] = useState("");
  const [loading, setloading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const getuser = async () => {
      try {
        setloading(true);
        const res = await customFetch.get(`/user/Profile/${username}`);
        const data = res?.data?.data;
        if (res?.data?.success === false) {
          toast({
            title: "Error!.",
            description: data?.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setloading(false);
        }
        setloading(false);
        setuser(data);
      } catch (error) {
        toast({
          title: "Error!.",
          description: error?.response?.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
      }
    };
    getuser();
  }, [username]);
  return (
    <>
      {loading && <Loading />}
      {
        !loading && !user && <h1 style={{textAlign:"center"}} > User Not Found </h1>
      }
      {!loading && user && (
        <>
          <Usercom user={user} />
          <Post
            likes={35}
            replies={120}
            postimage={"/post1.jpg"}
            posttitle="this is what it is"
          />
          <Post
            likes={45}
            replies={430}
            postimage={"/post2.jpg"}
            posttitle="the tranquile of conspire"
          />
          <Post
            likes={25}
            replies={220}
            postimage={"/post3.jpg"}
            posttitle="One of the modest design"
          />
        </>
      )}
    </>
  );
};

export default Userpage;
