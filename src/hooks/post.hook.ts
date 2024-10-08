import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createPostServerAction, getNewsFeedPosts } from "../Service/Posts";
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
