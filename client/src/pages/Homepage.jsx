import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Actualpost from "../components/Actualpost";
import customFetch from "../utils/CustomFetch";

const Homepage = () => {
  const toast = useToast();
  const [feeds, setfeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFeeds = async () => {
      try {
        setLoading(true);
        const response = await customFetch("/post/getFeed");
        const data = response?.data?.data;
        setfeeds(data);
        if (response.data.success === false) {
          toast({
            title: "Error!.",
            description: response?.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error!.",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    getFeeds();
  }, []);
  console.log(feeds);
  return (
    <>
      {feeds.length === 0 && <h3>Follow people to see their feeds</h3>}
      {feeds.map((feed) => (
        <>
        <Actualpost key={feed._id} feed={feed} postedBy={feed.postedBy} />
        </>
      ))}
    </>
  );
};

export default Homepage;
