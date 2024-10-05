import toast from "react-hot-toast";
import { TResponseError } from "../Types/Response/response.type";


export const handleApiError = (
  error: unknown,
  toastId?: undefined | string
) => {
  const apiError = error as TResponseError;

  if (apiError?.data?.message) {
    toast.error(apiError.data.message, { id: toastId, duration: 3000 });
  } else {
    toast.error("An unknown error occurred.", { id: toastId, duration: 3000 });
  }
};