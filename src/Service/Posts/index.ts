"use server"
import envConfig from "@/src/config/envConfig";
import { handleApiError } from "@/src/hooks/handleApiError";

export const getNewsFeedPosts = async (
  page: number,
  pageSize: number,
  query: any[]
) => {
  try {
    const res = await fetch(
      `${envConfig.baseApi}/post?sort=-createdAt&page=${page}&limit=${pageSize}`
    );
    return res?.json();
  } catch (error: any) {
    handleApiError(error);
    console.log(error?.message);
  }
};
