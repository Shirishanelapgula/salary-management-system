import { Request, Response, NextFunction } from "express";
import { employeeService } from "../services/employee.service.js";
import {
    createEmployeeSchema,
    employeeQuerySchema,
    updateEmployeeSchema,
} from "../validations/employee.validation.js";
import { ApiResponse } from "../utils/api-response.js";

type AuthenticatedRequest = Request & { user?: { id?: number } };

export class EmployeeController {
    async getEmployees(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const query = employeeQuerySchema.parse(req.query);

            const result = await employeeService.getEmployees(query);

            res.status(200).json({
                success: true,
                message: "Employees fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getEmployee(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const employee = await employeeService.getEmployee(
                Number(req.params.id)
            );

            res.status(200).json({
                success: true,
                data: employee,
            });
        } catch (error) {
            next(error);
        }
    }

    async createEmployee(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const body = createEmployeeSchema.parse(req.body);

            const employee = await employeeService.createEmployee(
                body,
                req.user?.id
            );

            res.status(201).json({
                success: true,
                message: "Employee created successfully",
                data: employee,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateEmployee(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const body = updateEmployeeSchema.parse(req.body);

            const employee = await employeeService.updateEmployee(
                Number(req.params.id),
                body,
                req.user?.id
            );

            res.status(200).json({
                success: true,
                message: "Employee updated successfully",
                data: employee,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteEmployee(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const result = await employeeService.deleteEmployee(
                Number(req.params.id),
                req.user?.id
            );

            res.status(200).json({
                success: true,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    async profile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data =
                await employeeService.getEmployeeProfile(
                    Number(req.params.id)
                );

            return ApiResponse.success(
                res,
                data
            );
        } catch (error) {
            next(error);
        }
    }

    async getEmployeeDetails(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const employeeId = Number(req.params.id);

            const data =
                await employeeService.getEmployeeDetails(
                    employeeId
                );

            return ApiResponse.success(
                res,
                data,
                "Employee details fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}

export const employeeController = new EmployeeController();