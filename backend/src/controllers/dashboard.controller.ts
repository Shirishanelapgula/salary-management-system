import { Request, Response, NextFunction } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class DashboardController {
  async summary(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getSummary();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async highestPaid(req: Request, res: Response, next: NextFunction) {
    try {
      const data =
        await dashboardService.getHighestPaidEmployees();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async lowestPaid(req: Request, res: Response, next: NextFunction) {
    try {
      const data =
        await dashboardService.getLowestPaidEmployees();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async salaryByDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await dashboardService.getDepartmentSalaryStats();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async countryStats(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await dashboardService.getCountryStats();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();