import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description number is required" }),
  category: z.string({ required_error: "Category number is required" }),
  premium: z.boolean({ required_error: "premium number is required" }),
});
