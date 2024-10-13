import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character"),
});

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  phone: z.string({ required_error: "Phone number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export const changePasswordValidationSchemaZod = z.object({
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .nonempty({ message: "Email is required" }),
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmNewPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
});
export const forgetPasswordSchemaZod = z.object({
  id: z.string({ required_error: "Id should be string" }),
});
