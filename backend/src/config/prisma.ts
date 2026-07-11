// Use CommonJS-compatible syntax to avoid ESM import/export issues
const { PrismaClient } = require("@prisma/client");

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

const prismaClient =
  global.prisma ??
  new PrismaClient({
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClient;
}

module.exports = { prisma: prismaClient };