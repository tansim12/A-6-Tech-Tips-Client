"use client";

import React, { useState, useMemo } from "react";
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

const PaymentHistoryTable = () => {
  const { data, isPending } = useFindMyAllPaymentInfo([] as any);

  const paymentData = data?.result || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };

  const [page, setPage] = useState(meta.page);
  const rowsPerPage = meta.limit;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return paymentData.slice(start, end);
  }, [page, paymentData]);

  if (isPending) return <ComponentsLoading />;

  return (
    <div className="container mx-auto p-4">
      {/* Responsive container for horizontal scrolling */}
      <div className="overflow-x-auto">
        <Table
          aria-label="Payment History Table with Pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={meta.totalPage}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
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
            {items.map((item: any) => (
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
    </div>
  );
};

export default PaymentHistoryTable;
