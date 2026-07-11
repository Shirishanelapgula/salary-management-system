const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const { countries, departments, designations } = require("../constants/seed-data");
const prisma = new PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // Clean existing data
    await prisma.salary.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.department.deleteMany();
    await prisma.country.deleteMany();
    // Create Departments
    const departmentRecords = await Promise.all(departments.map((name) => prisma.department.create({
        data: { name },
    })));
    // Create Countries
    const countryRecords = await Promise.all(countries.map((country) => prisma.country.create({
        data: country,
    })));
    const employees = [];
    for (let i = 1; i <= 10000; i++) {
        employees.push({
            employeeId: `EMP${String(i).padStart(5, "0")}`,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: `employee${i}@company.com`,
            designation: designations[Math.floor(Math.random() * designations.length)],
            departmentId: departmentRecords[Math.floor(Math.random() * departmentRecords.length)].id,
            countryId: countryRecords[Math.floor(Math.random() * countryRecords.length)].id,
        });
    }
    console.log("Creating Employees...");
    await prisma.employee.createMany({
        data: employees,
    });
    const dbEmployees = await prisma.employee.findMany();
    const salaries = dbEmployees.map((employee) => ({
        employeeId: employee.id,
        baseSalary: faker.number.int({
            min: 300000,
            max: 5000000,
        }),
        currency: countryRecords.find((c) => c.id === employee.countryId)?.currency ??
            "INR",
        effectiveFrom: new Date(),
        isCurrent: true,
    }));
    console.log("Creating Salaries...");
    await prisma.salary.createMany({
        data: salaries,
    });
    console.log("✅ Database seeded successfully");
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
export {};
//# sourceMappingURL=seed.js.map