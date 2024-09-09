import { z } from "zod";

export const createServicesSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  descriptionM: z.string().min(1, "Short description is required").max(150),
  descriptionL: z.string().min(1, "Description is required"),
});
