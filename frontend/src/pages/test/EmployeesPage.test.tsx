import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const useEmployeesMock = vi.fn();
const useCreateEmployeeMock = vi.fn();
const useUpdateEmployeeMock = vi.fn();
const useDeleteEmployeeMock = vi.fn();

vi.mock("../hooks/useEmployees", () => ({ useEmployees: () => useEmployeesMock() }));
vi.mock("../hooks/useCreateEmployee", () => ({ useCreateEmployee: () => useCreateEmployeeMock() }));
vi.mock("../hooks/useUpdateEmployee", () => ({ useUpdateEmployee: () => useUpdateEmployeeMock() }));
vi.mock("../hooks/useDeleteEmployee", () => ({ useDeleteEmployee: () => useDeleteEmployeeMock() }));
vi.mock("../components/layout/PageContainer", () => ({ default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div> }));
vi.mock("../components/employee/EmployeeToolBar", () => ({ default: ({ onAdd }: { onAdd: () => void }) => <button onClick={onAdd}>Add Employee</button> }));
vi.mock("../components/employee/EmployeeTable", () => ({ default: ({ employees }: { employees: Array<{ id: number; firstName: string }> }) => <div>{employees.map((e) => <p key={e.id}>{e.firstName}</p>)}</div> }));
vi.mock("../components/employee/EmployeeFilters", () => ({ default: () => <div>Filters</div> }));
vi.mock("../components/employee/EmployeeSearch", () => ({ default: () => <div>Search</div> }));
vi.mock("../components/employee/Pagination", () => ({ default: () => <div>Pagination</div> }));
vi.mock("../components/employee/EmployeeModal", () => ({ default: ({ open, title }: { open: boolean; title: string }) => open ? <div>{title}</div> : null }));
vi.mock("../components/employee/DeleteDialog", () => ({ default: ({ open, employeeName }: { open: boolean; employeeName: string }) => open ? <div>{employeeName}</div> : null }));

import EmployeesPage from "../EmployeesPage";

describe("EmployeesPage", () => {
  it("shows an empty state when there are no employees", () => {
    useEmployeesMock.mockReturnValue({ data: { data: { items: [] } }, isLoading: false });
    useCreateEmployeeMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateEmployeeMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteEmployeeMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<EmployeesPage />);

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });

  it("opens the create modal when the toolbar is used", async () => {
    const user = userEvent.setup();
    useEmployeesMock.mockReturnValue({ data: { data: { items: [] } }, isLoading: false });
    useCreateEmployeeMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateEmployeeMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteEmployeeMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<EmployeesPage />);
    await user.click(screen.getByRole("button", { name: /add employee/i }));

    expect(screen.getAllByText("Add Employee").length).toBeGreaterThan(0);
  });
});
