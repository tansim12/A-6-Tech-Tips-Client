"use client"
import React, { useEffect, useState } from "react";
import { useAdminFindAllUser } from "../hooks/userProfile.hook";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";
import { TQueryParams } from "../Types/Filter/filter.type";
import useDebounce from "../hooks/useDebounce";

const CManageUserPage = () => {
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

  const searchTerm = useDebounce(searchValue, 1000); // Debouncing with 500ms delay
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
    data: allUserData,
    isPending: isAllUserPending,
    isError: isAllUserError,
    isSuccess,
  } = useAdminFindAllUser(page, pageSize, [
    ...params,
    { name: "sort", value: sortValue },
  ]);

  if (isAllUserPending) {
    return <ComponentsLoading />;
  }

  console.log(allUserData);
  
  return <div>CManageUserPage</div>;
};

export default CManageUserPage;
