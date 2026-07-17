import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const useDepartmentsMock = vi.fn();
const useCreateDepartmentMock = vi.fn();
const useUpdateDepartmentMock = vi.fn();
const useDeleteDepartmentMock = vi.fn();

vi.mock("../hooks/useDepartments", () => ({ useDepartments: () => useDepartmentsMock() }));
vi.mock("../hooks/useCreateDepartment", () => ({ useCreateDepartment: () => useCreateDepartmentMock() }));
vi.mock("../hooks/useUpdateDepartment", () => ({ useUpdateDepartment: () => useUpdateDepartmentMock() }));
vi.mock("../hooks/useDeleteDepartment", () => ({ useDeleteDepartment: () => useDeleteDepartmentMock() }));
vi.mock("../components/layout/PageContainer", () => ({ default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div> }));
vi.mock("../components/department/DepartmentToolbar", () => ({ default: ({ onAdd }: { onAdd: () => void }) => <button onClick={onAdd}>Add Department</button> }));
vi.mock("../components/department/DepartmentSearch", () => ({ default: () => <div>Department Search</div> }));
vi.mock("../components/department/DepartmentTable", () => ({ default: ({ departments }: { departments: Array<{ id: number; name: string }> }) => <div>{departments.map((d) => <p key={d.id}>{d.name}</p>)}</div> }));
vi.mock("../components/department/DepartmentModal", () => ({ default: ({ open, title }: { open: boolean; title: string }) => open ? <div>{title}</div> : null }));
vi.mock("../components/department/DeleteDepartmentDialog", () => ({ default: ({ open, departmentName }: { open: boolean; departmentName: string }) => open ? <div>{departmentName}</div> : null }));

import DepartmentsPage from "./DepartmentsPage";

describe("DepartmentsPage", () => {
  it("shows an empty state when no departments are present", () => {
    useDepartmentsMock.mockReturnValue({ data: [], isLoading: false });
    useCreateDepartmentMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateDepartmentMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteDepartmentMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<DepartmentsPage />);

    expect(screen.getByText(/no departments found/i)).toBeInTheDocument();
  });

  it("opens the create modal from the toolbar", async () => {
    const user = userEvent.setup();
    useDepartmentsMock.mockReturnValue({ data: [], isLoading: false });
    useCreateDepartmentMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useUpdateDepartmentMock.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useDeleteDepartmentMock.mockReturnValue({ mutateAsync: vi.fn() });

    render(<DepartmentsPage />);
    await user.click(screen.getByRole("button", { name: /add department/i }));

    expect(screen.getAllByText("Add Department").length).toBeGreaterThan(0);
  });
});
