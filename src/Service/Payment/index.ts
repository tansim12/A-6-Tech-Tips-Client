"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";
import { TPaymentInfo } from "@/src/Types/Payment Info/paymentInfo.type";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

export const createPaymentAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/payment", payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const myAllPaymentInfoAction = async (
  page: number,
  pageSize: number,
  args: TQueryParams[]
) => {
  const params = new URLSearchParams();

  // Add sorting, pagination, and any other static query parameters
  params.append("sort", "-createdAt");
  params.append("page", page.toString());
  params.append("limit", pageSize.toString());

  // Loop through the args to dynamically append query parameters
  if (args) {
    args.forEach((item: TQueryParams) => {
      params.append(item.name, String(item.value)); // Convert value to string
    });
  }

  console.log(params.toString());
  
  try {
    const res = await axiosInstance.get(
      `/payment/my-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
