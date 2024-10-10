import { useQuery } from "@tanstack/react-query";
import { getUserProfileAction } from "../Service/Posts";

// Custom hook to fetch user data
export const useGetUserProfileData = () => {
    return useQuery({
      queryKey: ["GET_USER_PROFILE"], // queryKey with userId
      queryFn: async () => await getUserProfileAction(),
    });
  };
  