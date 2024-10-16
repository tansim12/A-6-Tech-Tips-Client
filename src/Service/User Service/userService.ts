"use server";
import { handleApiError } from "@/src/hooks/handleApiError";
import { axiosInstance } from "../axios/axiosInstance";
import { TUserProfile } from "@/src/Types/User/user.types";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

export const getUserProfileAction = async () => {
  try {
    const res = await axiosInstance.get(`/user-profile`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMyAllPostActions = async (
  page: number,
  pageSize: number,
  args: TQueryParams[]
) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", pageSize.toString());

    // Loop through the args to dynamically append query parameters
    if (args) {
      args.forEach((item: TQueryParams) => {
        params.append(item.name, String(item.value)); // Convert value to string
      });
    }

    const res = await axiosInstance.get(
      `/post/my-all-posts?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserInfoAction = async (payload: Partial<TUserProfile>) => {
  try {
    const res = await axiosInstance.put(`/user-profile`, payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const adminAnalyticsAction = async () => {
  try {
    const res = await axiosInstance.get(`/user-profile/admin-analytics`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const myAnalyticsAction = async () => {
  try {
    const res = await axiosInstance.get(`/user-profile/my-analytics`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const adminFindAllUserAction = async (
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
    const res = await axiosInstance.get(`/user?${params.toString()}`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
