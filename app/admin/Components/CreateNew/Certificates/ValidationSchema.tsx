import { z } from "zod";

export const createCertificatesSchema = z.object({
  name: z.string().min(1, "Title is required").max(60),
  description: z.string().min(1, "Description is required"),
});
