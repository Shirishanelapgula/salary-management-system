import { z } from "zod";

export const employeeQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(100).default(20),

  search: z.string().optional(),

  department: z.string().optional(),

  country: z.string().optional(),

  designation: z.string().optional(),

  sort: z
    .enum(["firstName", "lastName", "createdAt"])
    .default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),
});

export const createEmployeeSchema = z.object({
  employeeId: z.string().min(1),

  firstName: z.string().min(2).max(50),

  lastName: z.string().min(2).max(50),

  email: z.string().email(),

  designation: z.string().min(2),

  departmentId: z.number(),

  countryId: z.number(),

  baseSalary: z.number().positive(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();