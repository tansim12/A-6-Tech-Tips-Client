"use client";
import React, { useEffect, useState } from "react";
import {
  useAdminGetsAllPaymentsInfo,
  useAdminPaymentInfoUpdate,
} from "../hooks/payment.hook";
import toast from "react-hot-toast";
import {
  Button,
  Input,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import useDebounce from "../hooks/useDebounce";
import CustomPagination from "../Componets/Shared/CustomPagination";
import { FaEdit, FaSort } from "react-icons/fa";
import NoFoundData from "../Componets/ui/No Found/NoFoundData";
import moment from "moment";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";
import { FiSearch } from "react-icons/fi";
import CustomModal from "../Componets/ui/Custom Modal/CustomModal";
import { TQueryParams } from "../Types/Filter/filter.type";
import FXForm from "../Componets/Form/FXForm";
import CustomInput from "../Componets/Form/CustomInput";
import CustomToggle from "../Componets/Form/CustomToggle";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

const CManagePaymentPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [sortValue, setSortValue] = useState("-createdAt");
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const searchTerm = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (searchTerm) {
      setParams((prev) => [...prev, { name: "searchTerm", value: searchTerm }]);
    } else {
      const filteredParams = params?.filter(
        (filter: any) => !(filter.name === "searchTerm")
      );
      setParams(filteredParams);
    }
  }, [searchTerm]);

  const {
    data: allPaymentData,
    isPending: isPaymentInfoPending,
    isError: isPaymentInfoError,
  } = useAdminGetsAllPaymentsInfo(page, pageSize, [
    ...params,
    { name: "sort", value: sortValue },
  ]);

  const {
    mutate: handleUpdatePaymentInfo,
    data: paymentInfoUpdatedData,
    isPending: isUpdatedPaymentInfoIsPending,
    isSuccess: isUpdatedPaymentInfoIsSuccess,
    isError: isUpdatedPaymentInfoIsError,
  } = useAdminPaymentInfoUpdate();

  useEffect(() => {
    if (isPaymentInfoError) {
      toast.error("Failed to retrieve payment data");
    }
    if (isUpdatedPaymentInfoIsError) {
      toast.error("Failed to update payment info");
    }
  }, [isPaymentInfoError, isUpdatedPaymentInfoIsError]);

  useEffect(() => {
    if (isUpdatedPaymentInfoIsSuccess || paymentInfoUpdatedData) {
      Swal.fire({
        title: "Updated!",
        text: "Your file has been Updated.",
        icon: "success",
      });
    }
  }, [isUpdatedPaymentInfoIsSuccess, paymentInfoUpdatedData]);

  const handleSort = () => {
    setSortValue((prev) =>
      prev === "-createdAt" ? "createdAt" : "-createdAt"
    );
  };

  const handleSwitchChange = (checked: boolean, paymentId: string) => {
    console.log(paymentId);
    console.log(checked);
    let payload;

    // Update payload based on switch state
    if (checked === true) {
      payload = {
        isDecline: true,
        isVerified: false,
      };
    } else {
      payload = {
        isDecline: false,
        isVerified: true,
      };
    }

    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Create a new payload with paymentId and the updated payload
        const newPayload = {
          paymentId,
          payload: { ...payload },
        };

        // Call the function to update the payment info
        handleUpdatePaymentInfo(newPayload);
      }
    });
  };

  return (
    <div>
      {/* Sort and Filter Section */}
      <div className="flex justify-end items-center gap-5 my-4">
        <div className="flex justify-center items-center gap-5">
          <div className="w-full">
            <Input
              placeholder="Search..."
              aria-label="Search"
              fullWidth
              endContent={<FiSearch size={20} />}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleSort}>
              Sort <FaSort />
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <Table
            aria-label="Payment Management Table"
            className="min-w-full table-auto"
            bottomContent={isPaymentInfoPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Profile Photo</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Payment Type</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Approval Code</TableColumn>
              <TableColumn>Transaction ID</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>IsDecline</TableColumn>
            </TableHeader>
            <TableBody>
              {allPaymentData?.result?.length
                ? allPaymentData?.result?.map((payment: any) => (
                    <TableRow key={payment?._id}>
                      <TableCell>
                        <img
                          src={payment.userId.profilePhoto}
                          alt={`${payment.userId.name}'s profile`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{payment?.userId?.name}</TableCell>
                      <TableCell>{payment?.userId?.email}</TableCell>
                      <TableCell>{payment?.payment_type}</TableCell>
                      <TableCell>{payment?.amount}</TableCell>
                      <TableCell>{payment?.approval_code}</TableCell>
                      <TableCell>{payment?.mer_txnid}</TableCell>
                      <TableCell>
                        {moment(payment?.createdAt).format("LL")}
                      </TableCell>
                      <TableCell>
                        <Switch
                        isSelected={payment?.isDecline}
                          checked={payment?.isDecline} // Prepopulate the switch value (e.g., verified status)
                          onChange={(checked) =>
                            handleSwitchChange(
                              checked?.target?.checked as any,
                              payment?._id
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : !isPaymentInfoPending && <NoFoundData />}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center w-full mt-4">
          <CustomPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            total={allPaymentData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CManagePaymentPage;
