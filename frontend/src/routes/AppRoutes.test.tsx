import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("../layouts/MainLayout", () => ({ default: ({ children }: { children?: React.ReactNode }) => <div>MainLayout{children}</div> }));
vi.mock("../components/auth/ProtectedRoute", () => ({ default: () => <div>ProtectedRoute</div> }));
vi.mock("../pages/DashboardPage", () => ({ default: () => <div>DashboardPage</div> }));
vi.mock("../pages/EmployeesPage", () => ({ default: () => <div>EmployeesPage</div> }));
vi.mock("../pages/SalaryPage", () => ({ default: () => <div>SalaryPage</div> }));
vi.mock("../pages/AIPage", () => ({ default: () => <div>AIPage</div> }));
vi.mock("../pages/DepartmentsPage", () => ({ default: () => <div>DepartmentsPage</div> }));
vi.mock("../pages/CountriesPage", () => ({ default: () => <div>CountriesPage</div> }));
vi.mock("../pages/EmployeeProfilePage", () => ({ default: () => <div>EmployeeProfilePage</div> }));
vi.mock("../pages/LoginPage", () => ({ default: () => <div>LoginPage</div> }));
vi.mock("../pages/AuditLogsPage", () => ({ default: () => <div>AuditLogsPage</div> }));

import AppRoutes from "./AppRoutes";

describe("AppRoutes", () => {
  it("renders the login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("renders the dashboard route when authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("ProtectedRoute")).toBeInTheDocument();
  });
});
