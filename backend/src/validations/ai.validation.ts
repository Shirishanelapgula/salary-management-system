import { z } from "zod";

export const aiQuerySchema = z.object({
  query: z.string().min(3)
});