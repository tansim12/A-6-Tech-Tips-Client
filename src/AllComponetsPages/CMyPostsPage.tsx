"use client";

import { useEffect, useState } from "react";
import { useGetMyAllPostsData } from "../hooks/userProfile.hook";
import Post from "../Componets/ui/NewsFeed/Posts";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";
import { TQueryParams } from "../Types/Filter/filter.type";


import {
  Input,
} from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";

import { FaSort } from "react-icons/fa";
import CreateAtSort from "../Componets/Shared/CreateAtSort";
import CustomPagination from "../Componets/Shared/CustomPagination";
import useDebounce from "../hooks/useDebounce";

const CMyPostsPage = () => {
  const [sortValue, setSortValue] = useState("-createdAt");
  const handleSort = () => {
    setSortValue((prev) =>
      prev === "-createdAt" ? "createdAt" : "-createdAt"
    );
  };

  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const searchTerm = useDebounce(searchValue, 700); // Debouncing with 500ms delay
  useEffect(() => {
    if (searchTerm) {
      // This will trigger after 500ms delay when the user stops typing
      setParams((pre) => [...pre, { name: "searchTerm", value: searchTerm }]);
      // Call your search API or filtering function here
    } else {
      const filterOtherValue = params?.filter(
        (filter: any) => !(filter.name === "searchTerm")
      );
      setParams(filterOtherValue);
    }
  }, [searchTerm]);

  const {
    data: myAllPostData,
    isPending: isMyAllPostDataLoading,
    isError: isMyAllPostDataError,
    isSuccess,
  } = useGetMyAllPostsData(page, pageSize, [
    ...params,
    { name: "sort", value: sortValue },
  ]);

  if (isMyAllPostDataLoading) {
    return <ComponentsLoading />
  }
  return (
    <>
      {/* sort and filter section  */}
      <div className=" flex justify-end items-center gap-5 my-4  ">
        <div></div>
        <div className="flex justify-center items-center gap-5">
          {/* search  */}
          <div className="w-full">
            <Input
              //   contentLeft={<FiSearch size={20} />}
              placeholder="Search..."
              aria-label="Search"
              fullWidth
              endContent={<FiSearch size={20} />}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* sort div  */}
          <div>
            <CreateAtSort
              handleSort={handleSort}
              name="Sort"
              icon={<FaSort />}
            />
          </div>
        </div>
      </div>
      <div className="">
        {myAllPostData?.result?.length
          ? myAllPostData?.result?.map((item: any) => (
              <Post post={item} isShowDeleteOption={true} />
            ))
          : !isMyAllPostDataLoading && <NoFoundData />}
      </div>

      <div className="flex justify-center items-center w-full">
        <CustomPagination
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          total={myAllPostData?.meta?.total}
        />
      </div>
    </>
  );
};

export default CMyPostsPage;
