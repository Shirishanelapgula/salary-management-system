import { Request, Response, NextFunction } from "express";
import { departmentService } from "../services/department.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class DepartmentController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await departmentService.getDepartments();

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await departmentService.getDepartment(
          Number(req.params.id)
        );

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await departmentService.createDepartment(
          req.body
        );

      return ApiResponse.success(res, data);
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
      const data =
        await departmentService.updateDepartment(
          Number(req.params.id),
          req.body
        );

      return ApiResponse.success(res, data);
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
      const data =
        await departmentService.deleteDepartment(
          Number(req.params.id)
        );

      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }
}

export const departmentController =
  new DepartmentController();