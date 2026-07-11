import { Request, Response, NextFunction } from "express";
import { salaryService } from "../services/salary.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { salaryRevisionSchema } from "../validations/salary.validation.js";

export class SalaryController {
  async getCurrentSalary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = Number(req.params.id);

      const salary = await salaryService.getCurrentSalary(employeeId);

      return ApiResponse.success(
        res,
        salary,
        "Current salary fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getSalaryHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = Number(req.params.id);

      const history = await salaryService.getSalaryHistory(employeeId);

      return ApiResponse.success(
        res,
        history,
        "Salary history fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async reviseSalary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = Number(req.params.id);

      const body = salaryRevisionSchema.parse(req.body);

      const salary = await salaryService.reviseSalary(
        employeeId,
        body.baseSalary,
        body.effectiveFrom
      );

      return ApiResponse.created(
        res,
        salary,
        "Salary revised successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

export const salaryController = new SalaryController();