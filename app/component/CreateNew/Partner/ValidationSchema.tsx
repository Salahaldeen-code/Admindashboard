import { z } from "zod";

export const createPartnersSchema = z.object({
  name: z.string().min(1, "Title is required").max(60),
});
