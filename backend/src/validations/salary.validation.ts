import { z } from "zod";

export const salaryRevisionSchema = z.object({
  baseSalary: z.number().positive(),

  effectiveFrom: z.coerce.date().optional(),
});

export const salaryHistorySchema = z.object({
  employeeId: z.coerce.number().positive(),
});