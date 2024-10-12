"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { TUserProfile } from "@/src/Types/User/user.types";

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

export const updateUserInfoAction = async (payload: Partial<TUserProfile>) => {
  try {
    const res = await axiosInstance.put(`/user-profile`, payload);
  } catch (error) {
    handleApiError(error);
  }
};
