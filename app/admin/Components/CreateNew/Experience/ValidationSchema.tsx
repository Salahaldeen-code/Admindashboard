import { z } from "zod";

export const createExperiencesSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  description: z.string().min(1, "Title is required").max(255),
  date: z.string().min(1, "Title is required").max(60),
});
