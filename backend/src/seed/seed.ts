import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import {
  countries,
  departments,
  designations,
} from "../constants/seed-data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");

  // Delete child tables first
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.salary.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.country.deleteMany();

  console.log("Creating departments...");

  const departmentRecords = await Promise.all(
    departments.map((name) =>
      prisma.department.create({
        data: { name },
      })
    )
  );

  console.log("Creating countries...");

  const countryRecords = await Promise.all(
    countries.map((country) =>
      prisma.country.create({
        data: country,
      })
    )
  );

  console.log("Creating employees...");

  const employees = [];

  for (let i = 1; i <= 10000; i++) {
    employees.push({
      employeeId: `EMP${String(i).padStart(5, "0")}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `employee${i}@company.com`,
      designation:
        designations[
          Math.floor(Math.random() * designations.length)
        ],
      departmentId:
        departmentRecords[
          Math.floor(Math.random() * departmentRecords.length)
        ].id,
      countryId:
        countryRecords[
          Math.floor(Math.random() * countryRecords.length)
        ].id,
    });
  }

  await prisma.employee.createMany({
    data: employees,
  });

  console.log(`Seeded ${employees.length} employees`);

  const dbEmployees = await prisma.employee.findMany();

  console.log("Creating salaries...");

  const salaries = dbEmployees.map((employee) => ({
    employeeId: employee.id,
    baseSalary: faker.number.int({
      min: 300000,
      max: 5000000,
    }),
    currency:
      countryRecords.find(
        (c) => c.id === employee.countryId
      )?.currency ?? "INR",
    effectiveFrom: new Date(),
    isCurrent: true,
  }));

  await prisma.salary.createMany({
    data: salaries,
  });

  console.log(`Seeded ${salaries.length} salaries`);

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });