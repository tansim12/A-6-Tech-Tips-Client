"use client";
import React from "react";
import { useGetSinglePost } from "../hooks/post.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import Loading from "../Componets/ui/Loading/Loading";

const CPostDetailsPage = ({ params }: { params: any }) => {
  const { data, isPending } = useGetSinglePost(params?.postId);
  console.log(data);

  return (
    <div>
      {isPending && <Loading />}
      <div className="container mx-auto p-3">
        {data ? <Post post={data} /> : !isPending && <NoFoundData />}
      </div>
    </div>
  );
};

export default CPostDetailsPage;
