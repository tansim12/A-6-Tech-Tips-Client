import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  commentDeleteAction,
  commentReplyAction,
  createCommentAction,
  createPostServerAction,
  followAndUnFollowAction,
  getNewsFeedPosts,
  getSinglePostAction,
  giveReactAction,
} from "../Service/Posts";
import { TQueryParams } from "../Types/Filter/filter.type";
interface GiveReactPayload {
  postId: string;
  isDelete: boolean;
}
interface TPayload {
  userId: string;
  isCreateFollowing: boolean
}

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

export const useCreateComment = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_COMMENT"],

    mutationFn: async ({ postId, payload }: { postId: string; payload: any }) =>
      await createCommentAction(postId, payload),
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any);
    // },
  });
};
export const useCommentDelete = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["COMMENT_DELETE"],
    mutationFn: async ({ commentId }: { commentId: string }) => {
      return await commentDeleteAction(commentId);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any);
    // },
  });
};

export const useCommentReplies = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["COMMENT_REPLIES"],

    mutationFn: async ({
      commentId,
      payload,
    }: {
      commentId: string;
      payload: any;
    }) => await commentReplyAction(commentId, payload),
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any);
    // },
  });
};
export const useGiveReact = () => {
  // const queryClient = useQueryClient(); // Uncomment if needed
  return useMutation({
    mutationKey: ["GIVE_REACT"],
    mutationFn: async (payload: GiveReactPayload) => {
      const { postId, isDelete } = payload;
      return await giveReactAction(postId, { isDelete });
    },
  });
};
export const useFollowAndUnFollow = () => {
  // const queryClient = useQueryClient(); // Uncomment if needed
  return useMutation({
    mutationKey: ["FOLLOW_AND_UNFOLLOW"],
    mutationFn: async (payload: TPayload) => {
      const { userId, isCreateFollowing } = payload;
      return await followAndUnFollowAction(userId, { isCreateFollowing });
    },
  });
};
