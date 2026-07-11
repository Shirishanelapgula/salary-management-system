import { prisma } from "../config/prisma.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { salaryRepository } from "../repositories/salary.repository.js";

export class SalaryService {
  async getCurrentSalary(employeeId: number) {
    const salary =
      await salaryRepository.getCurrentSalary(employeeId);

    if (!salary) {
      throw new NotFoundError("Current salary not found");
    }

    return salary;
  }

  async getSalaryHistory(employeeId: number) {
    return salaryRepository.getSalaryHistory(employeeId);
  }

  async reviseSalary(
    employeeId: number,
    baseSalary: number,
    effectiveFrom = new Date()
  ) {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        country: true,
      },
    });

    if (!employee) {
      throw new NotFoundError("Employee not found");
    }

    return prisma.$transaction(async (tx) => {
      await tx.salary.updateMany({
        where: {
          employeeId,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
          effectiveTo: effectiveFrom,
        },
      });

      const salary = await tx.salary.create({
        data: {
          employeeId,
          baseSalary,
          currency: employee.country.currency,
          effectiveFrom,
          isCurrent: true,
        },
      });

      return salary;
    });
  }
}

export const salaryService = new SalaryService();