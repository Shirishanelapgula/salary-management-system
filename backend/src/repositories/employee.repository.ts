import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { EmployeeQuery } from "../types/employee.types.js";

export class EmployeeRepository {
    async findAll(query: EmployeeQuery) {
        const {
            page = 1,
            limit = 20,
            search,
            department,
            country,
            designation,
            sort = "createdAt",
            order = "desc",
        } = query;

        const where: Prisma.EmployeeWhereInput = {};

        if (search) {
            where.OR = [
                {
                    firstName: {
                        contains: search,
                    },
                },
                {
                    lastName: {
                        contains: search,
                    },
                },
                {
                    employeeId: {
                        contains: search,
                    },
                },
                {
                    email: {
                        contains: search,
                    },
                },
            ];
        }

        if (designation) {
            where.designation = designation;
        }

        if (department) {
            where.department = {
                name: department,
            };
        }

        if (country) {
            where.country = {
                name: country,
            };
        }

        const [items, total] = await Promise.all([
            prisma.employee.findMany({
                where,

                include: {
                    department: true,
                    country: true,
                    salaries: {
                        where: {
                            isCurrent: true,
                        },
                    },
                },

                orderBy: {
                    [sort]: order,
                },

                skip: (page - 1) * limit,

                take: limit,
            }),

            prisma.employee.count({
                where,
            }),
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findById(id: number) {
        return prisma.employee.findUnique({
            where: {
                id,
            },

            include: {
                department: true,
                country: true,
                salaries: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    }

    async findByEmployeeId(employeeId: string) {
        return prisma.employee.findUnique({
            where: {
                employeeId,
            },
        });
    }

    async findByEmail(email: string) {
        return prisma.employee.findUnique({
            where: {
                email,
            },
        });
    }

    async create(data: Prisma.EmployeeCreateInput) {
        return prisma.employee.create({
            data,

            include: {
                department: true,
                country: true,
            },
        });
    }

    async update(id: number, data: Prisma.EmployeeUpdateInput) {
        return prisma.employee.update({
            where: {
                id,
            },

            data,

            include: {
                department: true,
                country: true,
            },
        });
    }

    async delete(id: number) {
        return prisma.employee.delete({
            where: {
                id,
            },
        });
    }

    async findProfile(id: number) {
        return prisma.employee.findUnique({
            where: {
                id,
            },

            include: {
                department: true,

                country: true,

                salaries: {
                    orderBy: {
                        effectiveFrom: "desc",
                    },
                },
            },
        });
    }

    async findDetails(id: number) {
        return prisma.employee.findUnique({
            where: {
                id,
            },
            include: {
                department: true,
                country: true,

                salaries: {
                    orderBy: {
                        effectiveFrom: "desc",
                    },
                },
            },
        });
    }
}

export const employeeRepository = new EmployeeRepository();