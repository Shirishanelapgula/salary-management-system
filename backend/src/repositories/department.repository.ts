import { prisma } from "../config/prisma.js";

export class DepartmentRepository {
  async findAll() {
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
  }

  async findById(id: number) {
    return prisma.department.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            employees: true,
          },
        },
      },
    });
  }

  async findByName(name: string) {
    return prisma.department.findUnique({
      where: { name },
    });
  }

  async create(name: string) {
    return prisma.department.create({
      data: { name },
    });
  }

  async update(id: number, name: string) {
    return prisma.department.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number) {
    return prisma.department.delete({
      where: { id },
    });
  }
}

export const departmentRepository = new DepartmentRepository();