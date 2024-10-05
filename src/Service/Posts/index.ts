import envConfig from "@/src/config/envConfig";
import { handleApiError } from "@/src/hooks/handleApiError";

export const newsFeedPosts = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/post`,);
    return  res?.json()
  } catch (error: any) {
    handleApiError(error);
    console.log(error?.message);
  }
};
