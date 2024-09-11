import { z } from "zod";

export const createTeamsDirectorSchema = z.object({
  name: z.string().min(1, "Title is required").max(60),
  position: z.string().min(1, "Title is required").max(60),
  bio: z.string().min(1, "Title is required").max(255),
});
