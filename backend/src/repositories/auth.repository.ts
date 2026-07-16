import { prisma } from "../config/prisma.js";

export class AuthRepository {

    async findByEmail(email: string) {
        return prisma.user.findFirst({
            where: {
                employee: {
                    email,
                },
            },
            include: {
                employee: {
                    include: {
                        department: true,
                        country: true,
                    },
                },
            },
        });
    }

}

export const authRepository = new AuthRepository();