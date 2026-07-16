import bcrypt from "bcrypt";
import { authRepository } from "../repositories/auth.repository.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {

    async login(email: string, password: string) {

    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken({
        id: user.id,
        role: user.role,
        employeeId: user.employeeId,
    });

    return {
        token,
        user: {
            id: user.id,
            role: user.role,
            employee: user.employee,
        },
    };
}

}

export const authService = new AuthService();