import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../components/layout/PageContainer", () => ({
  default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div>,
}));

vi.mock("../components/dashboard/StatsGrid", () => ({ default: () => <div>StatsGrid</div> }));
vi.mock("../components/dashboard/DepartmentSalaryChart", () => ({ default: () => <div>DepartmentSalaryChart</div> }));
vi.mock("../components/dashboard/CountryDistributionChart", () => ({ default: () => <div>CountryDistributionChart</div> }));
vi.mock("../components/dashboard/HighestPaidTable", () => ({ default: () => <div>HighestPaidTable</div> }));
vi.mock("../components/dashboard/LowestPaidTable", () => ({ default: () => <div>LowestPaidTable</div> }));

import DashboardPage from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders the dashboard sections", () => {
    render(<DashboardPage />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("StatsGrid")).toBeInTheDocument();
    expect(screen.getByText("DepartmentSalaryChart")).toBeInTheDocument();
  });
});
