import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const useSalariesMock = vi.fn();
const useUpdateSalaryMock = vi.fn();
const useDeleteSalaryMock = vi.fn();

vi.mock("../hooks/useSalaries", () => ({ useSalaries: () => useSalariesMock() }));
vi.mock("../hooks/useUpdateSalary", () => ({ useUpdateSalary: () => useUpdateSalaryMock() }));
vi.mock("../hooks/useDeleteSalary", () => ({ useDeleteSalary: () => useDeleteSalaryMock() }));
vi.mock("../components/layout/PageContainer", () => ({ default: ({ title, children }: { title: string; children: React.ReactNode }) => <div><h1>{title}</h1>{children}</div> }));
vi.mock("../components/salary/SalaryToolbar", () => ({ default: () => <div>Salary Toolbar</div> }));
vi.mock("../components/salary/SalaryTable", () => ({ default: ({ salaries }: { salaries: Array<{ id: number; employee: { firstName: string; lastName: string; department: { name: string }; country: { name: string } } }> }) => <div>{salaries.map((s) => <p key={s.id}>{s.employee.firstName}</p>)}</div> }));
vi.mock("../components/salary/EditSalaryModal", () => ({ default: ({ open, salary }: { open: boolean; salary: any }) => open ? <div>{salary?.employee?.firstName ?? "Edit"}</div> : null }));
vi.mock("../components/salary/DeleteSalaryDialog", () => ({ default: ({ open }: { open: boolean }) => open ? <div>Delete Salary</div> : null }));

import SalaryPage from "./SalaryPage";

describe("SalaryPage", () => {
  it("shows a friendly empty state when there are no salary records", () => {
    useSalariesMock.mockReturnValue({ data: { data: [] }, isLoading: false, isError: false });
    useUpdateSalaryMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useDeleteSalaryMock.mockReturnValue({ mutate: vi.fn(), isPending: false });

    render(<SalaryPage />);

    expect(screen.getByText(/no salary records found/i)).toBeInTheDocument();
  });

  it("renders the toolbar and modal content when salary data exists", async () => {
    const user = userEvent.setup();
    const salary = { id: 1, employee: { firstName: "Asha", lastName: "Rao", department: { name: "IT" }, country: { name: "India" } } };
    useSalariesMock.mockReturnValue({ data: { data: [salary] }, isLoading: false, isError: false });
    useUpdateSalaryMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useDeleteSalaryMock.mockReturnValue({ mutate: vi.fn(), isPending: false });

    render(<SalaryPage />);
    await user.click(screen.getByText("Asha"));

    expect(screen.getByText("Asha")).toBeInTheDocument();
  });
});
