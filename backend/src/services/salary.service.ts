import { prisma } from "../config/prisma.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { salaryRepository } from "../repositories/salary.repository.js";

export class SalaryService {
  // ============================================
  // Salary Management APIs
  // ============================================

  async getSalaries() {
    return salaryRepository.findAll();
  }

  async getSalary(id: number) {
    const salary = await salaryRepository.findById(id);

    if (!salary) {
      throw new NotFoundError("Salary not found");
    }

    return salary;
  }

  async updateSalary(
    id: number,
    data: {
      baseSalary?: number;
      effectiveFrom?: Date;
      effectiveTo?: Date | null;
      isCurrent?: boolean;
    }
  ) {
    const salary = await salaryRepository.findById(id);

    if (!salary) {
      throw new NotFoundError("Salary not found");
    }

    return salaryRepository.update(id, data);
  }

  async deleteSalary(id: number) {
    const salary = await salaryRepository.findById(id);

    if (!salary) {
      throw new NotFoundError("Salary not found");
    }

    await salaryRepository.delete(id);

    return {
      message: "Salary deleted successfully",
    };
  }

  // ============================================
  // Employee Profile APIs
  // ============================================

  async getCurrentSalary(employeeId: number) {
    const salary = await salaryRepository.getCurrentSalary(employeeId);

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
    effectiveFrom: Date
  ) {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundError("Employee not found");
    }

    return salaryRepository.reviseSalary(
      employeeId,
      baseSalary,
      effectiveFrom
    );
  }
}

export const salaryService = new SalaryService();