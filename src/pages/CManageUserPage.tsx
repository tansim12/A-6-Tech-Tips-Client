"use client";
import React, { useEffect, useState } from "react";
import { useAdminFindAllUser } from "../hooks/userProfile.hook";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";
import { TQueryParams } from "../Types/Filter/filter.type";
import useDebounce from "../hooks/useDebounce";
import toast from "react-hot-toast";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";
import CustomPagination from "../Componets/Shared/CustomPagination";
import { FiSearch } from "react-icons/fi";
import CreateAtSort from "../Componets/Shared/CreateAtSort";
import { FaSort } from "react-icons/fa";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";

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
  const [pageSize, setPageSize] = useState(10);

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

  const [meta, setMeta] = useState(allUserData?.meta);

  useEffect(() => {
    if (isAllUserError) {
      toast.error("All user data get problem");
    }
  }, []);
  return (
    <div>

{/* modal section  */}


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

      {/* table section  */}
      <div className="container mx-auto p-4">
        {/* Responsive container for horizontal scrolling */}
        <div className="overflow-x-auto">
          <Table
            aria-label="User Management Table with Actions"
            className="min-w-full table-auto"
            bottomContent={isAllUserPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Profile Photo</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Verified</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {allUserData?.result?.length
                ? allUserData?.result?.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <img
                          src={user.profilePhoto}
                          alt={`${user.name}'s profile`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell
                        className={
                          user.role === "admin"
                            ? "text-red-500"
                            : user.role === "user"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }
                      >
                        {user.role}
                      </TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell
                        className={
                          user.isVerified ? "text-green-500" : "text-red-500"
                        }
                      >
                        {user.isVerified ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {moment(user.createdAt).format("ll")}
                      </TableCell>
                      <TableCell>
                        <Button color="primary" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : !isAllUserPending && <NoFoundData />}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center items-center w-full mt-4">
          <CustomPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            total={allUserData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CManageUserPage;
