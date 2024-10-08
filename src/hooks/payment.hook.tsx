import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../Service/axios/axiosInstance";
import { createPaymentAction } from "../Service/Payment";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async (payload) => await createPaymentAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "USER_PROFILE",
        "GET_RECENT_POST_DATA",
      ] as any);
    },
  });
};
