import { beforeEach, describe, expect, it, vi } from "vitest";

const employeeServiceMocks = vi.hoisted(() => ({
  getEmployees: vi.fn(),
  getEmployee: vi.fn(),
  createEmployee: vi.fn(),
  updateEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
  getEmployeeProfile: vi.fn(),
  getEmployeeDetails: vi.fn(),
}));

vi.mock("../services/employee.service.js", () => ({
  employeeService: {
    getEmployees: employeeServiceMocks.getEmployees,
    getEmployee: employeeServiceMocks.getEmployee,
    createEmployee: employeeServiceMocks.createEmployee,
    updateEmployee: employeeServiceMocks.updateEmployee,
    deleteEmployee: employeeServiceMocks.deleteEmployee,
    getEmployeeProfile: employeeServiceMocks.getEmployeeProfile,
    getEmployeeDetails: employeeServiceMocks.getEmployeeDetails,
  },
}));

import { EmployeeController } from "../controllers/employee.controller.js";
import { employeeService } from "../services/employee.service.js";

describe("EmployeeController", () => {
  const controller = new EmployeeController();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches employees with validated query params", async () => {
    const req: any = {
      query: { page: "2", limit: "10", search: "ali", department: "IT" },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const employees = { items: [{ id: 1 }], total: 1 };

    employeeServiceMocks.getEmployees.mockResolvedValue(employees);

    await controller.getEmployees(req, res, next);

    expect(employeeServiceMocks.getEmployees).toHaveBeenCalledWith(
      expect.objectContaining({ page: 2, limit: 10, search: "ali", department: "IT" })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("creates an employee and returns created response", async () => {
    const req: any = {
      body: {
        employeeId: "EMP001",
        firstName: "Asha",
        lastName: "Rao",
        email: "asha@example.com",
        designation: "Engineer",
        departmentId: 1,
        countryId: 1,
        baseSalary: 200000,
      },
      user: { id: 7 },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const createdEmployee = { id: 10, firstName: "Asha" };

    employeeServiceMocks.createEmployee.mockResolvedValue(createdEmployee);

    await controller.createEmployee(req, res, next);

    expect(employeeServiceMocks.createEmployee).toHaveBeenCalledWith(req.body, 7);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Employee created successfully",
      data: createdEmployee,
    });
  });

  it("updates an existing employee", async () => {
    const req: any = {
      params: { id: "3" },
      body: { firstName: "Updated" },
      user: { id: 8 },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const updatedEmployee = { id: 3, firstName: "Updated" };

    employeeServiceMocks.updateEmployee.mockResolvedValue(updatedEmployee);

    await controller.updateEmployee(req, res, next);

    expect(employeeServiceMocks.updateEmployee).toHaveBeenCalledWith(3, req.body, 8);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  });

  it("deletes an employee and returns a success payload", async () => {
    const req: any = { params: { id: "4" }, user: { id: 9 } };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const result = { message: "Deleted" };

    employeeServiceMocks.deleteEmployee.mockResolvedValue(result);

    await controller.deleteEmployee(req, res, next);

    expect(employeeServiceMocks.deleteEmployee).toHaveBeenCalledWith(4, 9);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, ...result });
  });
});

export { employeeService };
