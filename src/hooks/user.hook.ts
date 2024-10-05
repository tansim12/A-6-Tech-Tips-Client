import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../Service/axios/axiosInstance";

// Custom hook to fetch user data
export const useUserData = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_DATA", userId], // queryKey with userId
    queryFn: async ({ queryKey }) => {
      // Extract userId from queryKey (queryKey is an array)
      const [, userId] = queryKey;

      // Axios instance to fetch user data
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data; // Return the actual data from response
    },
    enabled: !!userId, // Query will only run if userId is provided
  });
};
