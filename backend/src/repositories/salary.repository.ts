import { prisma } from "../config/prisma.js";

export class SalaryRepository {
  // =========================
  // Salary Management
  // =========================

  async findAll() {
    return prisma.salary.findMany({
      where: {
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
      orderBy: {
        baseSalary: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.salary.findUnique({
      where: { id },
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

  async update(
    id: number,
    data: {
      baseSalary?: number;
      effectiveFrom?: Date;
      effectiveTo?: Date | null;
      isCurrent?: boolean;
    }
  ) {
    return prisma.salary.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.salary.delete({
      where: { id },
    });
  }

  // =========================
  // Employee Profile
  // =========================

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

  async reviseSalary(
    employeeId: number,
    baseSalary: number,
    effectiveFrom: Date
  ) {
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

      return tx.salary.create({
        data: {
          employeeId,
          baseSalary,
          currency: "INR",
          effectiveFrom,
          isCurrent: true,
        },
      });
    });
  }
}

export const salaryRepository = new SalaryRepository();