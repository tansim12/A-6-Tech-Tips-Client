"use client";

import { useState } from "react";
import { useGetMyAllPostsData } from "../hooks/userProfile.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";

const CMyPostsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const {
    data: myAllPostData,
    isPending: isMyAllPostDataLoading,
    isError: isMyAllPostDataError,
    isSuccess,
  } = useGetMyAllPostsData(page, pageSize);

  return (
    <>
      {isMyAllPostDataLoading && <ComponentsLoading />}
      <div>
        {myAllPostData?.result?.length
          ? myAllPostData?.result?.map((item: any) => (
              <Post post={item} isShowDeleteOption={true} />
            ))
          : !isMyAllPostDataLoading && <NoFoundData />}
      </div>
    </>
  );
};

export default CMyPostsPage;
