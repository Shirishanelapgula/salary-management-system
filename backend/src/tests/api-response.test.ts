import { describe, expect, it, vi } from "vitest";
import { ApiResponse } from "../utils/api-response.js";

describe("ApiResponse", () => {
  it("returns a standard success response", () => {
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    ApiResponse.success(res, { ok: true });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Success", data: { ok: true } });
  });

  it("returns a paginated response", () => {
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    ApiResponse.paginated(res, {
      items: [{ id: 1 }],
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    }, "Fetched");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Fetched",
      data: [{ id: 1 }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    });
  });

  it("returns a created response", () => {
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    ApiResponse.created(res, { created: true }, "Created");

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Created", data: { created: true } });
  });

  it("returns no content", () => {
    const res: any = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

    ApiResponse.noContent(res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
