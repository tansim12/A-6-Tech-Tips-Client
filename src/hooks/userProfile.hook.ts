import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminAnalyticsAction,
  adminFindAllUserAction,
  adminUserUpdateAction,
  getMyAllPostActions,
  getUserProfileAction,
  myAnalyticsAction,
  updateUserInfoAction,
} from "../Service/User Service/userService";
import { TPost } from "../Types/Posts/post.type";
import { TUser, TUserProfile } from "../Types/User/user.types";
import { TQueryParams } from "../Types/Filter/filter.type";

// Custom hook to fetch user data
export const useGetUserProfileData = () => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE"], // queryKey with userId
    queryFn: async () => await getUserProfileAction(),
  });
};

export const useGetMyAllPostsData = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["GET_MY_ALL_POST", page, pageSize, params], // queryKey with userId
    queryFn: async () => await getMyAllPostActions(page, pageSize, params),
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_USER_INFO"], // A unique mutation key
    mutationFn: async (payload: Partial<TUserProfile>) => {
      return await updateUserInfoAction(payload); // Perform the API call to update user info
    },
    onSuccess: (_data, variables) => {
      // Assuming the `payload` contains `userId` as part of the object, use it to revalidate the profile query.
      queryClient.invalidateQueries([
        "GET_USER_PROFILE",
        variables?._id,
        "GET_USER_DATA",
      ] as any);
    },
  });
};

export const useAdminAnalyticsData = () => {
  return useQuery({
    queryKey: ["ADMIN_ANALYTICS"], // queryKey with userId
    queryFn: async () => await adminAnalyticsAction(),
  });
};
export const useMyAnalyticsData = () => {
  return useQuery({
    queryKey: ["MY_ANALYTICS"], // queryKey with userId
    queryFn: async () => await myAnalyticsAction(),
  });
};

export const useAdminFindAllUser = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_USER", page, pageSize, params], // queryKey with userId
    queryFn: async () => await adminFindAllUserAction(page, pageSize, params),
  });
};

export const useAdminUserProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_UPDATE_USER_INFO"], // A unique mutation key
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: Partial<TUser>;
    }) => {
      return await adminUserUpdateAction(userId, payload); // Perform the API call to update user info
    },
    onSuccess: (_data, variables) => {
      // Revalidate queries based on userId or other parameters
      queryClient.invalidateQueries(["ADMIN_FIND_ALL_USER"] as any); // Invalidate the admin users list
      queryClient.invalidateQueries(["GET_USER_PROFILE", variables?.userId] as any); // Invalidate the user profile query
      queryClient.invalidateQueries(["GET_USER_DATA"] as any); // Invalidate any other user data related queries
    },
    onError: (error) => {
      console.error("Error updating user profile:", error);
    },
  });
};
