import { Request, Response, NextFunction } from "express";
import { auditService } from "../services/audit.service.js";

export class AuditController {
  async latest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const logs = await auditService.latest();

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const auditController = new AuditController();