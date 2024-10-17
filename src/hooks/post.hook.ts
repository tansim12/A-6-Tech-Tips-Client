import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminGetAllPostAction,
  commentDeleteAction,
  commentReplyAction,
  createCommentAction,
  createPostServerAction,
  followAndUnFollowAction,
  getNewsFeedPosts,
  getSinglePostAction,
  giveReactAction,
  updatePostsAction,
} from "../Service/Posts";
import { TQueryParams } from "../Types/Filter/filter.type";
import { TPost } from "../Types/Posts/post.type";
interface GiveReactPayload {
  postId: string;
  isDelete: boolean;
}
interface TPayload {
  userId: string;
  isCreateFollowing: boolean;
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_COMMENT"],

    mutationFn: async ({ postId, payload }: { postId: string; payload: any }) =>
      await createCommentAction(postId, payload),
    onSuccess: () => {
      // Invalidate the recent post data query
      queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any); // Use the relevant query key for recent posts
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["COMMENT_REPLIES"],

    mutationFn: async ({
      commentId,
      payload,
    }: {
      commentId: string;
      payload: any;
    }) => await commentReplyAction(commentId, payload),
    onSuccess: () => {
      // Invalidate the recent post data query
      queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any); // Use the relevant query key for recent posts
    },
  });
};
export const useGiveReact = () => {
  const queryClient = useQueryClient(); // Uncomment if needed
  return useMutation({
    mutationKey: ["GIVE_REACT"],
    mutationFn: async (payload: GiveReactPayload) => {
      const { postId, isDelete } = payload;
      return await giveReactAction(postId, { isDelete });
    },
    onSuccess: () => {
      // Invalidate the recent post data query
      queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any); // Use the relevant query key for recent posts
    },
  });
};
export const useFollowAndUnFollow = () => {
  const queryClient = useQueryClient(); // Uncomment if needed
  return useMutation({
    mutationKey: ["FOLLOW_AND_UNFOLLOW"],
    mutationFn: async (payload: TPayload) => {
      const { userId, isCreateFollowing } = payload;
      return await followAndUnFollowAction(userId, { isCreateFollowing });
    },
    onSuccess: () => {
      // Invalidate the recent post data query
      queryClient.invalidateQueries(["GET_RECENT_POST_DATA"] as any); // Use the relevant query key for recent posts
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({
      postId,
      payload,
    }: {
      postId: string;
      payload: Partial<TPost>;
    }) => await updatePostsAction(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "GET_RECENT_POST_DATA",
        "GET_MY_ALL_POST",
      ] as any);
    },
  });
};

export const useAdminGetAllPosts = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["GET_ADMIN_ALL_POST", page, pageSize, params], // queryKey with userId
    queryFn: async () => await adminGetAllPostAction(page, pageSize, params),
  });
};
