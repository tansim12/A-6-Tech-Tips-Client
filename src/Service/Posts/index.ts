"use server";

import envConfig from "@/src/config/envConfig";
import { handleApiError } from "@/src/hooks/handleApiError";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import { TPost } from "@/src/Types/Posts/post.type";
import { axiosInstance } from "../axios/axiosInstance";

// Define a function to get news feed posts
export const getNewsFeedPosts = async (
  page: number,
  pageSize: number,
  args: TQueryParams[]
) => {
  try {
    // Create a new URLSearchParams object to build query params
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

    // Fetch from the API with the constructed URL including query parameters
    const res = await fetch(`${envConfig.baseApi}/post?${params.toString()}`, {
      method: "GET",
      next: {
        tags: ["recentPost"],
      },
    });

    // Return the response in JSON format
    return await res.json();
  } catch (error: any) {
    // Handle the API error
    handleApiError(error);
    console.error("Error fetching posts:", error?.message);
  }
};

export const createPostServerAction = async (payload: Partial<TPost>) => {
  try {
    const res = await axiosInstance.post("/post", payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getSinglePostAction = async (postId: string) => {
  try {
    const res = await axiosInstance.get(`/post/${postId}`);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const createCommentAction = async (postId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/comments/${postId}`, payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const commentReplyAction = async (commentId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/comments/replies/${commentId}`,
      payload
    );
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const commentDeleteAction = async (commentId: string) => {
  try {
    const res = await axiosInstance.delete(`/comments/${commentId}`);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const giveReactAction = async (postId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/post/react/${postId}`, payload);
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const followAndUnFollowAction = async (userId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/user-profile/create-and-remove-followers/${userId}`,
      payload
    );
    return res?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePostsAction = async (
  postId: string,
  payload: Partial<TPost>
) => {
  try {
    const res = await axiosInstance.put(`/post/${postId}`, payload);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// admin get all post
export const adminGetAllPostAction = async (
  page: number,
  pageSize: number,
  args: TQueryParams[]
) => {
  try {
    // Create a new URLSearchParams object to build query params
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", pageSize.toString());

    // Loop through the args to dynamically append query parameters
    if (args) {
      args.forEach((item: TQueryParams) => {
        params.append(item.name, String(item.value)); // Convert value to string
      });
    }

    const res = await axiosInstance.get(`/post/all-posts?${params.toString()}`);

    return res?.data?.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// update share count

export const updateShareCountAction = async (postId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/post/post-share/${postId}`, payload);
    return res?.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};
