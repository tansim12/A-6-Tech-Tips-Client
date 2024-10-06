import { useQuery } from "@tanstack/react-query";
import { getNewsFeedPosts } from "../Service/Posts";
import { TQueryParams } from "../Types/Filter/filter.type";

export const useGetRecentPostData = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["GET_RECENT_POST_DATA", page, pageSize, params], // queryKey with userId
    queryFn: async () => {
      return await getNewsFeedPosts(page, pageSize, params);
    },
    // enabled: !!userId, // Query will only run if userId is provided
  });
};
