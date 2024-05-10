import React, { useEffect, useState } from "react";
import Usercom from "../components/Usercom";
import Post from "../components/Post";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import Loading from "../components/Loading";
import Actualpost from "../components/Actualpost";

const Userpage = () => {
  const { username } = useParams();
  const [user, setuser] = useState("");
  const [loading, setloading] = useState(false);
  const [post, setpost] = useState([])
  const [fetchin, setFetching] = useState(false)
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
    const getPost =async ()=>{
       try {
        setFetching(true)
         const res =await  customFetch.get(`/user/userposts/${username}`)
         const data = res?.data?.data
         if(res.data?.success===false){
          toast({
            title: "Error!.",
            description: data?.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setFetching(false)
          setpost([])
         }
         setFetching(false)
         setpost(data)
       } catch (error) {
        toast({
          title: "Error!.",
          description: error?.response?.data?.message|| error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setFetching(false)
        setpost([])
       }
    }
    getuser();
    getPost()
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
          {fetchin && <Loading/>}
          {!fetchin && post.length===0 && <h3>this user has no posts</h3> }
          {!fetchin && post.length!==0 && 
              post.map(ps=>(
                <Actualpost key={ps._id} feed={ps} postedBy={ps.postedBy} />
              ))
          }
        </>
      )}
    </>
  );
};

export default Userpage