import { prisma } from "../config/prisma.js";

export class SalaryRepository {
  async getCurrentSalary(employeeId: number) {
    return prisma.salary.findFirst({
      where: {
        employeeId,
        isCurrent: true,
      },
      include: {
        employee: {
          include: {
            department: true,
            country: true,
          },
        },
      },
    });
  }

  async getSalaryHistory(employeeId: number) {
    return prisma.salary.findMany({
      where: {
        employeeId,
      },

      orderBy: {
        effectiveFrom: "desc",
      },
    });
  }
}

export const salaryRepository = new SalaryRepository();