"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";

export const getUserProfileAction = async () => {
  try {
    const res = await axiosInstance.get(`/user-profile`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMyAllPostActions = async (page: number, pageSize: number) => {
  try {
    const res = await axiosInstance.get(
      `/post/my-all-posts?page=${page}&limit=${pageSize}`
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
