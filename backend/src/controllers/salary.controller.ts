import { Request, Response, NextFunction } from "express";
import { salaryService } from "../services/salary.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { salaryRevisionSchema } from "../validations/salary.validation.js";

export class SalaryController {

  // ============================================
  // Salary Management APIs
  // ============================================

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const salaries = await salaryService.getSalaries();

      return ApiResponse.success(
        res,
        salaries,
        "Salaries fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const salary = await salaryService.getSalary(
        Number(req.params.id)
      );

      return ApiResponse.success(
        res,
        salary,
        "Salary fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const salary = await salaryService.updateSalary(
        Number(req.params.id),
        req.body
      );

      return ApiResponse.success(
        res,
        salary,
        "Salary updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await salaryService.deleteSalary(
        Number(req.params.id)
      );

      return ApiResponse.success(
        res,
        result,
        "Salary deleted successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  // ============================================
  // Employee Profile Salary APIs
  // ============================================

  async getCurrentSalary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = Number(req.params.id);

      const salary =
        await salaryService.getCurrentSalary(employeeId);

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

      const history =
        await salaryService.getSalaryHistory(employeeId);

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

      const salary =
        await salaryService.reviseSalary(
          employeeId,
          body.baseSalary,
          // ensure a Date is always passed (fall back to now if undefined)
          new Date(body.effectiveFrom ?? Date.now())
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