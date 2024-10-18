"use client";
import React, { useRef } from "react";
import { useGetSinglePost } from "../hooks/post.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import Loading from "../Componets/ui/Loading/Loading";
import { useReactToPrint } from "react-to-print";
import { MdLocalPrintshop } from "react-icons/md";
import CustomButton from "../Componets/ui/Button/CustomButton";

const CPostDetailsPage = ({ params }: { params: any }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { data, isPending } = useGetSinglePost(params?.postId);
  return (
    <div className="container mx-auto p-3">
      <div className="flex justify-end w-full">
        <button
          className="flex justify-center items-center border-2 dark:border-white light:border-black px-3 py-2 my-3 rounded-lg hover:bg-primary transition-all"
          onClick={reactToPrintFn as any}
        >
          <MdLocalPrintshop />
          Print
        </button>
      </div>

      {isPending && <Loading />}
      <div ref={contentRef}>
        {data ? (
          <Post post={data} isCheck={true} />
        ) : (
          !isPending && <NoFoundData />
        )}
      </div>
    </div>
  );
};

export default CPostDetailsPage;
