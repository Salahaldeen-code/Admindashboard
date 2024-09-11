import { title } from "process";
import { z } from "zod";

export const creategeneralInfoSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  key: z.string().min(1, "small description is required").max(60),
  value: z.string().min(1, "description is required").max(60),
});
