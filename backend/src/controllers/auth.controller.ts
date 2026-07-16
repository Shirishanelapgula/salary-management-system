import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validations/auth.validation.js";
import { authService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class AuthController {

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const body =
                loginSchema.parse(req.body);

            const result =
                await authService.login(
                    body.email,
                    body.password
                );

            return ApiResponse.success(
                res,
                result,
                "Login successful"
            );

        } catch (error) {
            next(error);
        }

    }

}

export const authController =
    new AuthController();