import { z } from "zod";

export const createNewsEventsSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  short_description: z
    .string()
    .min(1, "Short description is required")
    .max(150),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required").max(60),
});
