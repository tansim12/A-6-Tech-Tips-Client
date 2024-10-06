"use client";
import { getNewsFeedPosts } from "@/src/Service/Posts";
import { TPost } from "@/src/Types/Posts/post.type";
import React, { useEffect, useState } from "react";
import Post from "../NewsFeed/Posts";
import { useGetRecentPostData } from "@/src/hooks/post.hook";
import infiniteScrollFn from "@/src/utils/infiniteScrollFn";
import { Spinner } from "@nextui-org/react";
import { useUser } from "@/src/Context/user.context";

const ShowRecentPost = () => {
  const { params } = useUser();
  const [allPostData, setAllPostData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const { data, isLoading, isSuccess } = useGetRecentPostData(
    page,
    pageSize,
    params
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

//   useEffect(() => {
//     if (params?.length >= 1) {
//       setPage(1);
//     }
//   }, [params]);

    console.log({params});

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
