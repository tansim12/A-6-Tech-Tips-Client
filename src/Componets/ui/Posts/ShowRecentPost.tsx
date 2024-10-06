"use client";
import { getNewsFeedPosts } from "@/src/Service/Posts";
import { TPost } from "@/src/Types/Posts/post.type";
import React, { useState } from "react";
import Post from "../NewsFeed/Posts";
import { useGetRecentPostData } from "@/src/hooks/post.hook";

const ShowRecentPost =  () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(13);

const {data} = useGetRecentPostData(page,pageSize,[])
  
  return (
    <div>
      {data?.data?.result?.map((item: TPost) => (
        <Post key={item?._id} post={item} />
      ))}
    </div>
  );
};

export default ShowRecentPost;
