import { beforeEach, describe, expect, it, vi } from "vitest";

const providerParseMock = vi.hoisted(() => vi.fn());
const queryExecutorExecuteMock = vi.hoisted(() => vi.fn());

vi.mock("../ai/rule-based.provider.js", () => ({
  RuleBasedProvider: vi.fn().mockImplementation(function (this: { parse: typeof providerParseMock }) {
    this.parse = providerParseMock;
  }),
}));

vi.mock("../ai/query-executor.js", () => ({
  aiQueryExecutor: {
    execute: queryExecutorExecuteMock,
  },
}));

import { AIService } from "../services/ai.service.js";

describe("AIService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("formats employee count responses", async () => {
    providerParseMock.mockResolvedValue({ intent: "employee_count" });
    queryExecutorExecuteMock.mockResolvedValue(42);

    const service = new AIService();
    const result = await service.execute("How many employees?");

    expect(providerParseMock).toHaveBeenCalledWith("How many employees?");
    expect(queryExecutorExecuteMock).toHaveBeenCalledWith({ intent: "employee_count" });
    expect(result.answer).toContain("42 employees");
    expect(result.raw).toBe(42);
  });

  it.each([
    ["department_count", 5, "🏢 There are 5 departments in the organization."],
    ["country_count", 3, "🌍 Employees belong to 3 different countries."],
    ["average_salary", 250000, "💰 The average employee salary is ₹2,50,000."],
    ["total_payroll", 5000000, "💸 The current monthly payroll is ₹50,00,000."],
    ["employees_by_department", [{ name: "IT", _count: { employees: 4 } }], "👥 Employees by Department\n\nIT : 4 employees"],
    ["employees_by_country", [{ name: "India", _count: { employees: 6 } }], "🌍 Employees by Country\n\nIndia : 6 employees"],
    ["recent_employees", [{ firstName: "Ravi", lastName: "Kumar", department: { name: "IT" }, country: { name: "India" } }], "🆕 Recently Joined Employees\n\nRavi Kumar\nDepartment : IT\nCountry : India"],
    ["default", "anything", "Sorry, I couldn't understand your request."],
  ])("formats %s responses", async (intent, data, expected) => {
    providerParseMock.mockResolvedValue({ intent });
    queryExecutorExecuteMock.mockResolvedValue(data);

    const service = new AIService();
    const result = await service.execute("Test query");

    expect(result.answer).toBe(expected);
  });

  it("returns a friendly message when there are no salary records", async () => {
    providerParseMock.mockResolvedValue({ intent: "highest_paid" });
    queryExecutorExecuteMock.mockResolvedValue([]);

    const service = new AIService();
    const result = await service.execute("Show highest paid");

    expect(result.answer).toBe("No salary records found.");
  });

  it("formats highest and lowest paid employee lists", async () => {
    providerParseMock.mockResolvedValue({ intent: "highest_paid" });
    queryExecutorExecuteMock.mockResolvedValue([
      {
        employee: {
          firstName: "Asha",
          lastName: "Rao",
          department: { name: "Engineering" },
          country: { name: "India" },
        },
        baseSalary: 4000000,
      },
    ]);

    const service = new AIService();
    const result = await service.execute("Show highest paid");

    expect(result.answer).toContain("🏆 Top 10 Highest Paid Employees");
    expect(result.answer).toContain("Asha Rao");
    expect(result.answer).toContain("Salary : ₹40,00,000");
  });

  it("formats country-specific employee results and empty state", async () => {
    providerParseMock.mockResolvedValue({ intent: "employees_by_country_name" });
    queryExecutorExecuteMock.mockResolvedValue([]);

    const service = new AIService();
    const emptyResult = await service.execute("Show employees in India");
    expect(emptyResult.answer).toBe("No employees found for the requested country.");

    queryExecutorExecuteMock.mockResolvedValue([
      {
        firstName: "Nina",
        lastName: "Shah",
        designation: "Manager",
        department: { name: "Sales" },
        country: { name: "India" },
      },
    ]);

    const populatedResult = await service.execute("Show employees in India");
    expect(populatedResult.answer).toContain("🌍 Employees in India");
    expect(populatedResult.answer).toContain("Nina Shah");
  });

  it("formats department salary reports for populated and empty data", async () => {
    providerParseMock.mockResolvedValue({ intent: "department_salary_report" });
    queryExecutorExecuteMock.mockResolvedValue([]);

    const service = new AIService();
    const emptyResult = await service.execute("Show department payroll");
    expect(emptyResult.answer).toBe("No departments found.");

    queryExecutorExecuteMock.mockResolvedValue([
      {
        name: "Finance",
        employees: [
          { salaries: [{ baseSalary: 100000 }] },
          { salaries: [] },
        ],
      },
    ]);

    const populatedResult = await service.execute("Show department payroll");
    expect(populatedResult.answer).toContain("📊 Department Salary Report");
    expect(populatedResult.answer).toContain("Finance");
    expect(populatedResult.answer).toContain("Payroll : ₹1,00,000");
  });
});
