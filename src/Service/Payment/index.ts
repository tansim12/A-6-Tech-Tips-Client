"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";
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

  try {
    const res = await axiosInstance.get(
      `/payment/my-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const adminGetsAllPaymentInfoAction = async (
  page: number,
  pageSize: number,
  args: TQueryParams[]
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", pageSize.toString());

  // Loop through the args to dynamically append query parameters
  if (args) {
    args.forEach((item: TQueryParams) => {
      params.append(item.name, String(item.value)); // Convert value to string
    });
  }

  try {
    const res = await axiosInstance.get(
      `/payment/all-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const adminUpdatePaymentInfoAction = async (
  paymentId: string,
  payload: any
) => {

  try {
    const res = await axiosInstance.put(
      `/payment/payment-update/${paymentId}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
