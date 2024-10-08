"use server";
interface CustomJwtPayload extends JwtPayload {
  data?: {
    id: string;
    // other properties of the data object
  };
}

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { axiosInstance } from "../axios/axiosInstance";
export const createRegister = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", payload);
    if (data?.success) {
      const cookieStore = cookies(); // Use cookies in server-side context
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createLogin = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", payload);
    if (data?.success) {
      const cookieStore = cookies(); // Use cookies in server-side context
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async (): Promise<any | null> => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      console.warn("No access token found.");
      return null;
    }

    const decodedToken = await jwtDecode<CustomJwtPayload>(accessToken);
    if (decodedToken) {
      const res = await axiosInstance.get(`/user/${decodedToken?.data?.id}`);   
      return res?.data?.data;
    }else{
      null
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const logoutFn = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
