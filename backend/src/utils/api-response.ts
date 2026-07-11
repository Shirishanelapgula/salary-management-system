import { Response } from "express";

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static paginated<T>(
    res: Response,
    result: {
      items: T[];
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    message = "Success"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data: result.items,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }

  static created<T>(res: Response, data: T, message = "Created") {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}