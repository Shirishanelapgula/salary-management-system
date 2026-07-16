import { prisma } from "../config/prisma.js";
import type { ParsedIntent } from "../types/ai.types.js";

class AIQueryExecutor {
    async execute(intent: ParsedIntent) {
        switch (intent.intent) {
            case "highest_paid":
                return prisma.salary.findMany({
                    where: {
                        isCurrent: true,
                        ...(intent.entity
                            ? {
                                employee: {
                                    country: {
                                        name: intent.entity,
                                    },
                                },
                            }
                            : {}),
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
                    take: intent.limit ?? 10,
                });

            case "lowest_paid":
                return prisma.salary.findMany({
                    where: {
                        isCurrent: true,
                        ...(intent.entity
                            ? {
                                employee: {
                                    country: {
                                        name: intent.entity,
                                    },
                                },
                            }
                            : {}),
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
                        baseSalary: "asc",
                    },
                    take: intent.limit ?? 10,
                });

            case "total_payroll": {
                const result = await prisma.salary.aggregate({
                    where: {
                        isCurrent: true,
                    },
                    _sum: {
                        baseSalary: true,
                    },
                });

                return result._sum.baseSalary ?? 0;
            }

            case "average_salary": {
                const result = await prisma.salary.aggregate({
                    where: {
                        isCurrent: true,
                    },
                    _avg: {
                        baseSalary: true,
                    },
                });

                return Math.round(result._avg.baseSalary ?? 0);
            }

            case "employee_count":
                return prisma.employee.count();

            case "department_count":
                return prisma.department.count();

            case "country_count":
                return prisma.country.count();

            case "employees_by_department":
                return prisma.department.findMany({
                    include: {
                        _count: {
                            select: {
                                employees: true,
                            },
                        },
                    },
                    orderBy: {
                        name: "asc",
                    },
                });

            case "employees_by_country":
                return prisma.country.findMany({
                    include: {
                        _count: {
                            select: {
                                employees: true,
                            },
                        },
                    },
                    orderBy: {
                        name: "asc",
                    },
                });

            case "recent_employees":
                return prisma.employee.findMany({
                    include: {
                        department: true,
                        country: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 10,
                });

            case "dashboard_summary": {
                const [
                    employeeCount,
                    departmentCount,
                    countryCount,
                    payroll,
                ] = await Promise.all([
                    prisma.employee.count(),
                    prisma.department.count(),
                    prisma.country.count(),
                    prisma.salary.aggregate({
                        where: {
                            isCurrent: true,
                        },
                        _sum: {
                            baseSalary: true,
                        },
                    }),
                ]);

                return {
                    employeeCount,
                    departmentCount,
                    countryCount,
                    totalPayroll: payroll._sum.baseSalary ?? 0,
                };
            }
            case "employees_by_country_name":
                return prisma.employee.findMany({
                    where: {
                        country: {
                            name: {
                                contains: intent.entity,
                            },
                        },
                    },
                    include: {
                        department: true,
                        country: true,
                    },
                });

            case "department_salary_report": {
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

                return departments;
            }

            default:
                return "Sorry, I couldn't understand the request.";
        }
    }
}

export const aiQueryExecutor = new AIQueryExecutor();