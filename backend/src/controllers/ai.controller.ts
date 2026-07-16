import { Request, Response, NextFunction } from "express";
import { aiService } from "../services/ai.service.js";
import { aiQuerySchema } from "../validations/ai.validation.js";
import { ApiResponse } from "../utils/api-response.js";

export class AIController {
    async query(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const body = aiQuerySchema.parse(req.body);

            const result = await aiService.execute(body.query);

            return ApiResponse.success(
                res,
                {
                    answer: result.answer,
                },
                "AI response generated successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}

export const aiController = new AIController();