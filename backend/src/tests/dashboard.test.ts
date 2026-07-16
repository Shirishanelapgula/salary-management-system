import { beforeEach, describe, expect, it, vi } from "vitest";

const dashboardServiceMocks = vi.hoisted(() => ({
  getSummary: vi.fn(),
  getHighestPaidEmployees: vi.fn(),
  getLowestPaidEmployees: vi.fn(),
  getDepartmentSalaryStats: vi.fn(),
  getCountryStats: vi.fn(),
}));

vi.mock("../services/dashboard.service.js", () => ({
  dashboardService: {
    getSummary: dashboardServiceMocks.getSummary,
    getHighestPaidEmployees: dashboardServiceMocks.getHighestPaidEmployees,
    getLowestPaidEmployees: dashboardServiceMocks.getLowestPaidEmployees,
    getDepartmentSalaryStats: dashboardServiceMocks.getDepartmentSalaryStats,
    getCountryStats: dashboardServiceMocks.getCountryStats,
  },
}));

import { DashboardController } from "../controllers/dashboard.controller.js";

describe("DashboardController", () => {
  const controller = new DashboardController();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a dashboard summary payload", async () => {
    const req: any = {};
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const summary = { totalEmployees: 10 };

    dashboardServiceMocks.getSummary.mockResolvedValue(summary);

    await controller.summary(req, res, next);

    expect(dashboardServiceMocks.getSummary).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Success", data: summary });
  });

  it("returns highest paid employees", async () => {
    const req: any = {};
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const highestPaid = [{ id: 1 }];

    dashboardServiceMocks.getHighestPaidEmployees.mockResolvedValue(highestPaid);

    await controller.highestPaid(req, res, next);

    expect(dashboardServiceMocks.getHighestPaidEmployees).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Success", data: highestPaid });
  });

  it("returns country statistics", async () => {
    const req: any = {};
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();
    const countryStats = [{ name: "India", count: 5 }];

    dashboardServiceMocks.getCountryStats.mockResolvedValue(countryStats);

    await controller.countryStats(req, res, next);

    expect(dashboardServiceMocks.getCountryStats).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Success", data: countryStats });
  });
});
