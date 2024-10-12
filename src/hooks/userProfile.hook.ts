import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyAllPostActions,
  getUserProfileAction,
  updateUserInfoAction,
} from "../Service/User Service/userService";
import { TPost } from "../Types/Posts/post.type";
import { TUserProfile } from "../Types/User/user.types";

// Custom hook to fetch user data
export const useGetUserProfileData = () => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE"], // queryKey with userId
    queryFn: async () => await getUserProfileAction(),
  });
};

export const useGetMyAllPostsData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["GET_MY_ALL_POST", page, pageSize], // queryKey with userId
    queryFn: async () => await getMyAllPostActions(page, pageSize),
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
      queryClient.invalidateQueries(["GET_USER_PROFILE", variables?._id,"GET_USER_DATA"] as any);
    },
  });
};
