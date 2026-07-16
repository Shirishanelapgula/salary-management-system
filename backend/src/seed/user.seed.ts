import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";

async function seedUser() {
    const employee = await prisma.employee.findFirst();

    if (!employee) {
        return;
    }

    const existing = await prisma.user.findUnique({
        where: {
            employeeId: employee.id,
        },
    });

    if (existing) {
        return;
    }

    const password = await bcrypt.hash(
        "Admin@123",
        10
    );

    await prisma.user.create({
        data: {
            employeeId: employee.id,
            password,
            role: "ADMIN",
        },
    });

}

seedUser()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });