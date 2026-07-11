import { prisma } from "../config/prisma.js";

export class DashboardService {
  async getSummary() {
    const [
      totalEmployees,
      totalDepartments,
      totalCountries,
      currentSalaries,
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.department.count(),
      prisma.country.count(),
      prisma.salary.findMany({
        where: {
          isCurrent: true,
        },
        select: {
          baseSalary: true,
        },
      }),
    ]);

    const totalSalary = currentSalaries.reduce(
      (sum, salary) => sum + salary.baseSalary,
      0
    );

    const averageSalary =
      currentSalaries.length > 0
        ? totalSalary / currentSalaries.length
        : 0;

    return {
      totalEmployees,
      totalDepartments,
      totalCountries,
      totalSalary,
      averageSalary,
    };
  }

  async getHighestPaidEmployees(limit = 10) {
    return prisma.salary.findMany({
      where: {
        isCurrent: true,
      },
      orderBy: {
        baseSalary: "desc",
      },
      take: limit,
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

  async getLowestPaidEmployees(limit = 10) {
    return prisma.salary.findMany({
      where: {
        isCurrent: true,
      },
      orderBy: {
        baseSalary: "asc",
      },
      take: limit,
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

  async getDepartmentSalaryStats() {
    const departments = await prisma.department.findMany({
      include: {
        employees: {
          include: {
            salaries: {
              where: {
                isCurrent: true,
              },
            },
          },
        },
      },
    });

    return departments.map((department) => {
      const salaries = department.employees.flatMap((employee) =>
        employee.salaries.map((salary) => salary.baseSalary)
      );

      const total = salaries.reduce((a, b) => a + b, 0);

      return {
        department: department.name,
        employeeCount: department.employees.length,
        totalSalary: total,
        averageSalary:
          salaries.length > 0 ? total / salaries.length : 0,
      };
    });
  }

  async getCountryStats() {
    const countries = await prisma.country.findMany({
      include: {
        employees: true,
      },
    });

    return countries.map((country) => ({
      country: country.name,
      currency: country.currency,
      employeeCount: country.employees.length,
    }));
  }
}

export const dashboardService = new DashboardService();