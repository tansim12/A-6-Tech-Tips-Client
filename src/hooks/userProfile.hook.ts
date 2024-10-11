import { useQuery } from "@tanstack/react-query";
import { getMyAllPostActions, getUserProfileAction } from "../Service/User Service/userService";


// Custom hook to fetch user data
export const useGetUserProfileData = () => {
    return useQuery({
      queryKey: ["GET_USER_PROFILE"], // queryKey with userId
      queryFn: async () => await getUserProfileAction(),
    });
  };
  
export const useGetMyAllPostsData = (page:number,pageSize:number,) => {
    return useQuery({
      queryKey: ["GET_MY_ALL_POST",page, pageSize], // queryKey with userId
      queryFn: async () => await getMyAllPostActions(page,pageSize),
    });
  };
  