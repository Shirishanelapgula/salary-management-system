import { Request, Response, NextFunction } from "express";
import { geminiService } from "../services/gemini.service.js";

export class GeminiController {
  async test(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await geminiService.test();

      res.json({
        success: true,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const geminiController = new GeminiController();