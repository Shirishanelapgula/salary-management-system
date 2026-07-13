import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { employeeRepository } from "../repositories/employee.repository.js";
import type {
  CreateEmployeeRequest,
  EmployeeQuery,
  UpdateEmployeeRequest,
} from "../types/employee.types.js";

export class EmployeeService {
  async getEmployees(query: EmployeeQuery) {
    return employeeRepository.findAll(query);
  }

  async getEmployee(id: number) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }

  async createEmployee(data: CreateEmployeeRequest) {
    const existingEmployeeId = await employeeRepository.findByEmployeeId(
      data.employeeId
    );

    if (existingEmployeeId) {
      throw new Error("Employee ID already exists");
    }

    const existingEmail = await employeeRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    return prisma.$transaction(async (tx) => {
      const employee = await tx.employee.create({
        data: {
          employeeId: data.employeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          designation: data.designation,
          department: {
            connect: {
              id: data.departmentId,
            },
          },
          country: {
            connect: {
              id: data.countryId,
            },
          },
        },
        include: {
          department: true,
          country: true,
        },
      });

      await tx.salary.create({
        data: {
          employeeId: employee.id,
          baseSalary: data.baseSalary,
          currency: employee.country.currency,
          effectiveFrom: new Date(),
          isCurrent: true,
        },
      });

      return employee;
    });
  }

  async updateEmployee(id: number, data: UpdateEmployeeRequest) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return prisma.$transaction(async (tx) => {
      const updatedEmployee = await tx.employee.update({
        where: {
          id,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          designation: data.designation,
          departmentId: data.departmentId,
          countryId: data.countryId,
        },
        include: {
          department: true,
          country: true,
        },
      });

      if (data.baseSalary !== undefined) {
        await tx.salary.updateMany({
          where: {
            employeeId: id,
            isCurrent: true,
          },
          data: {
            isCurrent: false,
            effectiveTo: new Date(),
          },
        });

        await tx.salary.create({
          data: {
            employeeId: id,
            baseSalary: data.baseSalary,
            currency: updatedEmployee.country.currency,
            effectiveFrom: new Date(),
            isCurrent: true,
          },
        });
      }

      return updatedEmployee;
    });
  }

  async deleteEmployee(id: number) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return prisma.$transaction(async (tx) => {
      await tx.salary.deleteMany({
        where: {
          employeeId: id,
        },
      });

      await tx.employee.delete({
        where: {
          id,
        },
      });

      return {
        message: "Employee deleted successfully",
      };
    });
  }
}

export const employeeService = new EmployeeService();