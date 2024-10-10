import { USER_ROLE, USER_STATUS } from "./user.const";
interface TUserProfile {
  _id: string;
  followers: string[];
}

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  password: string;
  phone: string;
  status?: "active" | "block";
  passwordChangeAt?: Date;
  isDelete?: boolean;
  profilePhoto?: string;
  isVerified?: boolean;
  userProfile?: TUserProfile;
}
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
