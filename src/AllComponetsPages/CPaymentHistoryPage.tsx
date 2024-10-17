"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useFindMyAllPaymentInfo } from "../hooks/payment.hook";
import moment from "moment";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";
import CustomPagination from "../Componets/Shared/CustomPagination";

const PaymentHistoryTable = () => {
  // Move useState to the top of the component to avoid breaking React's rules of hooks
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch payment history data
  const { data: paymentHistoryData, isPending } = useFindMyAllPaymentInfo(
    page,
    pageSize,
    []
  );

  // Handle loading state
  if (isPending) return <ComponentsLoading />;

  // Extract metadata from API response (if available)
  const meta = paymentHistoryData?.meta || { total: 0 };

  return (
    <div className="container mx-auto p-4">
      {/* Responsive container for horizontal scrolling */}
      <div className="overflow-x-auto">
        <Table
          aria-label="Payment History Table with Pagination"
          className="min-w-full table-auto"
        >
          <TableHeader>
            <TableColumn>User Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Transaction ID</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Payment Type</TableColumn>
            <TableColumn>Approval Code</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Updated At</TableColumn>
          </TableHeader>
          <TableBody>
            {paymentHistoryData?.result?.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell>{item.userId.name}</TableCell>
                <TableCell>{item.userId.email}</TableCell>
                <TableCell>{item.mer_txnid}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.payment_type}</TableCell>
                <TableCell>{item.approval_code}</TableCell>
                <TableCell>{moment(item.createdAt).format("ll")}</TableCell>
                <TableCell>{moment(item.updatedAt).format("ll")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center items-center w-full">
        <CustomPagination
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          total={meta?.total}
        />
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
