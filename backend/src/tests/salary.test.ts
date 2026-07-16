import { beforeEach, describe, expect, it, vi } from "vitest";

const salaryServiceMocks = vi.hoisted(() => ({
  getSalaries: vi.fn(),
  getSalary: vi.fn(),
  updateSalary: vi.fn(),
  deleteSalary: vi.fn(),
  getCurrentSalary: vi.fn(),
  getSalaryHistory: vi.fn(),
  reviseSalary: vi.fn(),
}));

vi.mock("../services/salary.service.js", () => ({
  salaryService: {
    getSalaries: salaryServiceMocks.getSalaries,
    getSalary: salaryServiceMocks.getSalary,
    updateSalary: salaryServiceMocks.updateSalary,
    deleteSalary: salaryServiceMocks.deleteSalary,
    getCurrentSalary: salaryServiceMocks.getCurrentSalary,
    getSalaryHistory: salaryServiceMocks.getSalaryHistory,
    reviseSalary: salaryServiceMocks.reviseSalary,
  },
}));

import { SalaryController } from "../controllers/salary.controller.js";

describe("SalaryController", () => {
  const controller = new SalaryController();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all salaries", async () => {
    const req: any = {};
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const salaries = [{ id: 1, baseSalary: 200000 }];

    salaryServiceMocks.getSalaries.mockResolvedValue(salaries);

    await controller.getAll(req, res, next);

    expect(salaryServiceMocks.getSalaries).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Salaries fetched successfully",
      data: salaries,
    });
  });

  it("updates a salary and returns the updated payload", async () => {
    const req: any = { params: { id: "5" }, body: { baseSalary: 250000 } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const updatedSalary = { id: 5, baseSalary: 250000 };

    salaryServiceMocks.updateSalary.mockResolvedValue(updatedSalary);

    await controller.update(req, res, next);

    expect(salaryServiceMocks.updateSalary).toHaveBeenCalledWith(5, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Salary updated successfully",
      data: updatedSalary,
    });
  });

  it("deletes a salary and returns the deletion result", async () => {
    const req: any = { params: { id: "6" } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const result = { message: "Deleted" };

    salaryServiceMocks.deleteSalary.mockResolvedValue(result);

    await controller.delete(req, res, next);

    expect(salaryServiceMocks.deleteSalary).toHaveBeenCalledWith(6);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Salary deleted successfully", data: result });
  });

  it("revises salary using a parsed payload", async () => {
    const req: any = {
      params: { id: "7" },
      body: { baseSalary: 300000, effectiveFrom: "2026-01-01" },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const revisedSalary = { id: 7, baseSalary: 300000 };

    salaryServiceMocks.reviseSalary.mockResolvedValue(revisedSalary);

    await controller.reviseSalary(req, res, next);

    expect(salaryServiceMocks.reviseSalary).toHaveBeenCalledWith(7, 300000, expect.any(Date));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Salary revised successfully",
      data: revisedSalary,
    });
  });
});
