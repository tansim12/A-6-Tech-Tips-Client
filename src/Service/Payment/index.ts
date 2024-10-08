"use server"
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";

export const createPaymentAction = async (payload: any) => {
    try {
      const res = await axiosInstance.post("/payment", payload);     
      return res?.data;
      
    } catch (error) {  
      handleApiError(error);
    }
  };
  