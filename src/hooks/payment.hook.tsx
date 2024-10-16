import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPaymentAction,
  myAllPaymentInfoAction,
} from "../Service/Payment";
import { TPaymentInfo } from "../Types/Payment Info/paymentInfo.type";
import { TQueryParams } from "../Types/Filter/filter.type";

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

export const useFindMyAllPaymentInfo = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["MY_ALL_PAYMENT_INFO", , page, pageSize, params],
    queryFn: async () => await myAllPaymentInfoAction(page, pageSize, params),
  });
};
