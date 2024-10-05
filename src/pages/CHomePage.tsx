import React from "react";
import { newsFeedPosts } from "../Service/Posts";
import Post from "../Componets/ui/NewsFeed/Posts";
import { TPost } from "../Types/Posts/post.type";

const CHomePage = async () => {
  const res = await newsFeedPosts();
  return (
    <div>
      {res?.data?.result?.map((item: TPost) => (
        <Post key={item?._id} post={item} />
      ))}
    </div>
  );
};

export default CHomePage;
