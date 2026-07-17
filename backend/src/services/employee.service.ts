import { prisma } from "../config/prisma.js";
import { employeeRepository } from "../repositories/employee.repository.js";
import { auditService } from "./audit.service.js";

import type {
  CreateEmployeeRequest,
  EmployeeQuery,
  UpdateEmployeeRequest,
} from "../types/employee.types.js";

export class EmployeeService {
  /**
   * Audit should never break CRUD operations.
   */
  private async safeAuditLog(
    action: string,
    entityType: string,
    entityId: string,
    description: string,
    userId?: number
  ) {
    try {
      await auditService.log(
        action,
        entityType,
        entityId,
        description,
        userId
      );
    } catch (err) {
      console.error("Audit log skipped:", err);
    }
  }

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

  async createEmployee(
    data: CreateEmployeeRequest,
    userId?: number
  ) {
    const existingEmployeeId =
      await employeeRepository.findByEmployeeId(data.employeeId);

    if (existingEmployeeId) {
      throw new Error("Employee ID already exists");
    }

    const existingEmail =
      await employeeRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const employee = await prisma.$transaction(async (tx) => {
      const department = await tx.department.findUnique({
        where: {
          id: data.departmentId,
        },
      });

      if (!department) {
        throw new Error("Department not found");
      }

      const country = await tx.country.findUnique({
        where: {
          id: data.countryId,
        },
      });

      if (!country) {
        throw new Error("Country not found");
      }

      const employee = await tx.employee.create({
        data: {
          employeeId: data.employeeId,
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

      await tx.salary.create({
        data: {
          employeeId: employee.id,
          baseSalary: data.baseSalary,
          currency: country.currency,
          effectiveFrom: new Date(),
          isCurrent: true,
        },
      });

      return employee;
    });

    await this.safeAuditLog(
      "CREATE",
      "EMPLOYEE",
      employee.employeeId,
      `Created employee ${employee.firstName} ${employee.lastName}`,
      userId
    );

    return employee;
  }

  async updateEmployee(
    id: number,
    data: UpdateEmployeeRequest,
    userId?: number
  ) {
    const employee =
      await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const updatedEmployee =
      await prisma.$transaction(async (tx) => {
        const updatedEmployee =
          await tx.employee.update({
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

    await this.safeAuditLog(
      "UPDATE",
      "EMPLOYEE",
      updatedEmployee.employeeId,
      `Updated employee ${updatedEmployee.firstName} ${updatedEmployee.lastName}`,
      userId
    );

    return updatedEmployee;
  }

  async deleteEmployee(
    id: number,
    userId?: number
  ) {
    const employee =
      await employeeRepository.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    await prisma.$transaction(async (tx) => {
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
    });

    await this.safeAuditLog(
      "DELETE",
      "EMPLOYEE",
      employee.employeeId,
      `Deleted employee ${employee.firstName} ${employee.lastName}`,
      userId
    );

    return {
      message: "Employee deleted successfully",
    };
  }

  async getEmployeeProfile(id: number) {
    const employee =
      await employeeRepository.findProfile(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const currentSalary =
      employee.salaries.find(
        (salary) => salary.isCurrent
      ) ?? null;

    return {
      employee: {
        id: employee.id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        designation: employee.designation,
        department: employee.department,
        country: employee.country,
      },
      currentSalary,
      salaryHistory: employee.salaries,
    };
  }

  async getEmployeeDetails(id: number) {
    const employee =
      await employeeRepository.findDetails(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return {
      employee,
      currentSalary:
        employee.salaries.find(
          (salary) => salary.isCurrent
        ) ?? null,
      salaryHistory: employee.salaries,
    };
  }
}

export const employeeService = new EmployeeService();