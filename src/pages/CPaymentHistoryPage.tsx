"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import moment from "moment";
import { useFindMyAllPaymentInfo } from "../hooks/payment.hook";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";

// Define your data type
interface PaymentData {
  _id: string;
  userId: { name: string; email: string };
  mer_txnid: string;
  amount: number;
  payment_type: string;
  approval_code: string;
  createdAt: string;
  updatedAt: string;
}

const PaymentHistoryTable = () => {
  const { data, isPending } = useFindMyAllPaymentInfo([] as any);

  const paymentData: PaymentData[] = data?.result || [];

  // Define your columns using useMemo for better performance
  const columns = useMemo<ColumnDef<PaymentData>[]>(
    () => [
      {
        header: "User Name",
        accessorKey: "userId.name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "userId.email",
      },
      {
        header: "Transaction ID",
        accessorKey: "mer_txnid",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Payment Type",
        accessorKey: "payment_type",
      },
      {
        header: "Approval Code",
        accessorKey: "approval_code",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: (info) => moment(info.getValue()).format("ll"),
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: (info) => moment(info.getValue()).format("ll"),
      },
    ],
    []
  );

  // Setup table instance using useReactTable
  const table = useReactTable({
    data: paymentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <ComponentsLoading />;

  return (
    <div className="container mx-auto p-4">
      {/* Responsive container for horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
