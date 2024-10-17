import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminGetsAllPaymentInfoAction,
  adminUpdatePaymentInfoAction,
  createPaymentAction,
  myAllPaymentInfoAction,
} from "../Service/Payment";
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
export const useAdminGetsAllPaymentsInfo = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_GETS_ALL_PAYMENT_INFO", page, pageSize, params],
    queryFn: async () =>
      await adminGetsAllPaymentInfoAction(page, pageSize, params),
  });
};

export const useAdminPaymentInfoUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["PAYMENT_INFO_UPDATE"],
    mutationFn: async ({
      paymentId,
      payload,
    }: {
      paymentId: string;
      payload: any;
    }) => await adminUpdatePaymentInfoAction(paymentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["ADMIN_GETS_ALL_PAYMENT_INFO"] as any);
    },
  });
};
