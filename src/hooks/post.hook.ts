import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../Service/axios/axiosInstance";
import { getNewsFeedPosts } from "../Service/Posts";

export const useGetRecentPostData = (
  page: number,
  pageSize: number,
  query: any[]
) => {
  return useQuery({
    queryKey: ["GET_RECENT_POST_DATA", page, pageSize, query], // queryKey with userId
    queryFn: async () => await getNewsFeedPosts(page, pageSize, query),
    // enabled: !!userId, // Query will only run if userId is provided
  });
};
