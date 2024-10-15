"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";
import { TPaymentInfo } from "@/src/Types/Payment Info/paymentInfo.type";

export const createPaymentAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/payment", payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const myAllPaymentInfoAction = async (query: Partial<TPaymentInfo>) => {
  
  try {
    const res = await axiosInstance.get("/payment/my-payment-info");
    // console.log(res?.data);
    
    console.log("hello .................................");
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
