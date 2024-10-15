import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description number is required" }).max(5000, "Description cannot exceed 5000 characters"),
  category: z.string({ required_error: "Category number is required" }),
  premium: z.boolean({ required_error: "premium number is required" }).optional(),
});
