import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { countries, departments, designations }  from "../constants/seed-data.js";

const prisma = new PrismaClient();

async function main() {

  // Clean existing data
  await prisma.salary.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.country.deleteMany();

  // Create Departments
  const departmentRecords = await Promise.all(
    departments.map((name:any) =>
      prisma.department.create({
        data: { name },
      })
    )
  );

  // Create Countries
  const countryRecords = await Promise.all(
    countries.map((country:any) =>
      prisma.country.create({
        data: country,
      })
    )
  );

  const employees = [];

  for (let i = 1; i <= 10000; i++) {
    employees.push({
      employeeId: `EMP${String(i).padStart(5, "0")}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `employee${i}@company.com`,
      designation:
        designations[Math.floor(Math.random() * designations.length)],
      departmentId:
        departmentRecords[
          Math.floor(Math.random() * departmentRecords.length)
        ].id,
      countryId:
        countryRecords[Math.floor(Math.random() * countryRecords.length)].id,
    });
  }

  await prisma.employee.createMany({
    data: employees,
  });

  const dbEmployees = await prisma.employee.findMany();

  const salaries = dbEmployees.map((employee :any) => ({
    employeeId: employee.id,
    baseSalary: faker.number.int({
      min: 300000,
      max: 5000000,
    }),
    currency:
      countryRecords.find((c) => c.id === employee.countryId)?.currency ??
      "INR",
    effectiveFrom: new Date(),
    isCurrent: true,
  }));

  await prisma.salary.createMany({
    data: salaries,
  });

}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });