import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostServerAction,
  getNewsFeedPosts,
  getSinglePostAction,
} from "../Service/Posts";
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
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_POST"],

    mutationFn: async (payload) => await createPostServerAction(payload as any),
    onSuccess: () => {
      queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any);
    },
  });
};

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST_DATA", postId], // queryKey with userId
    queryFn: async () => {
      return await getSinglePostAction(postId);
    },
  });
};
