"use client";
import { getNewsFeedPosts } from "@/src/Service/Posts";
import { TPost } from "@/src/Types/Posts/post.type";
import React, { useEffect, useState } from "react";
import Post from "../NewsFeed/Posts";
import { useGetRecentPostData } from "@/src/hooks/post.hook";
import infiniteScrollFn from "@/src/utils/infiniteScrollFn";
import { Spinner } from "@nextui-org/react";

const ShowRecentPost = () => {
  const [allPostData, setAllPostData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const { data, isLoading, isSuccess } = useGetRecentPostData(
    page,
    pageSize,
    []
  );
  useEffect(() => {
    if (data?.data?.result) {
      if (page > 1) {
        setAllPostData((prevData) => [...prevData, ...data.data.result]);
      } else {
        setAllPostData([...data.data.result]);
      }
    }
  }, [data, page]);

  infiniteScrollFn(page, setPage, data?.data?.meta?.total, pageSize);

  return (
    <div>
      {allPostData?.map((item: TPost) => (
        <Post key={item?._id} post={item} />
      ))}

      {isLoading && !isSuccess && (
        <div className="w-full flex justify-center items-center my-10">
          <Spinner label="Loading..." color="success" labelColor="success" />
        </div>
      )}
    </div>
  );
};

export default ShowRecentPost;
