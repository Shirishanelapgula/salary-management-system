import { prisma } from "../config/prisma.js";

export class CountryRepository {
  async findAll() {
    return prisma.country.findMany({
      orderBy: {
        name: "asc",
      },

      include: {
        _count: {
          select: {
            employees: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return prisma.country.findUnique({
      where: {
        id,
      },

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
    return prisma.country.findUnique({
      where: {
        name,
      },
    });
  }

  async create(name: string, currency: string) {
    return prisma.country.create({
      data: {
        name,
        currency,
      },
    });
  }

  async update(
    id: number,
    name: string,
    currency: string
  ) {
    return prisma.country.update({
      where: {
        id,
      },

      data: {
        name,
        currency,
      },
    });
  }

  async delete(id: number) {
    return prisma.country.delete({
      where: {
        id,
      },
    });
  }
}

export const countryRepository =
  new CountryRepository();