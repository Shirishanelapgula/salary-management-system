// Use CommonJS-compatible syntax to avoid ESM import/export issues
const { PrismaClient } = require("@prisma/client");
const prismaClient = global.prisma ??
    new PrismaClient({
        log: ["query", "warn", "error"],
    });
if (process.env.NODE_ENV !== "production") {
    global.prisma = prismaClient;
}
module.exports = { prisma: prismaClient };
export {};
//# sourceMappingURL=prisma.js.map