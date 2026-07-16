import { prisma } from "../config/prisma.js";

export class AuditRepository {

    async create(data: {
        action: string;
        entityType: string;
        entityId: string;
        description: string;
        userId?: number;
    }) {

        return prisma.auditLog.create({
            data,
        });

    }

    async getLatest(limit = 20) {

        return prisma.auditLog.findMany({

            take: limit,

            orderBy: {
                createdAt: "desc",
            },

            include: {
                user: {
                    include: {
                        employee: true,
                    },
                },
            },
        });

    }

}

export const auditRepository =
    new AuditRepository();