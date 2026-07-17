import { useMemo, useState } from "react";

import PageContainer from "../components/layout/PageContainer";

import EmployeeToolBar from "../components/employee/EmployeeToolBar";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeFilters from "../components/employee/EmployeeFilters";
import EmployeeSearch from "../components/employee/EmployeeSearch";
import Pagination from "../components/employee/Pagination";
import EmployeeModal from "../components/employee/EmployeeModal";
import DeleteDialog from "../components/employee/DeleteDialog";

import { useEmployees } from "../hooks/useEmployees";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

import type { Employee } from "../types/employee.types";
import type { EmployeeFormData } from "../components/employee/EmployeeForm";

export default function EmployeesPage() {
    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [country, setCountry] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingEmployee, setEditingEmployee] =
        useState<Employee | null>(null);

    const [deleteEmployee, setDeleteEmployee] =
        useState<Employee | null>(null);

    const { data, isLoading } = useEmployees({
        page,
        limit: 10,
        search,
        department,
        country,
    });

    const createMutation = useCreateEmployee();

    const updateMutation = useUpdateEmployee();

    const deleteMutation = useDeleteEmployee();

    const result = data?.data;

    const defaultValues = useMemo(() => {
        if (!editingEmployee) return undefined;

        return {
            employeeId: editingEmployee.employeeId,
            firstName: editingEmployee.firstName,
            lastName: editingEmployee.lastName,
            email: editingEmployee.email,
            designation: editingEmployee.designation,
            departmentId: editingEmployee.department.id,
            countryId: editingEmployee.country.id,
            baseSalary:
                editingEmployee.salaries[0]?.baseSalary ?? 0,
        };
    }, [editingEmployee]);

    const handleCreate = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setDeleteEmployee(employee);
    };

    const handleSubmit = async (
        data: EmployeeFormData
    ) => {
        if (editingEmployee) {
            await updateMutation.mutateAsync({
                id: editingEmployee.id,
                payload: data,
            });
        } else {
            await createMutation.mutateAsync(data);
        }

        setIsModalOpen(false);
        setEditingEmployee(null);
    };

    const confirmDelete = async () => {
        if (!deleteEmployee) return;

        if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
        }

        await deleteMutation.mutateAsync(deleteEmployee.id);

        setDeleteEmployee(null);
    };

    if (isLoading) {
        return (
            <PageContainer title="Employees">
                <div className="flex min-h-[50vh] items-center justify-center">
                    Loading...
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Employees">
            <div className="flex h-full flex-col">

                <EmployeeToolBar onAdd={handleCreate} />

                <div className="mt-6 flex-1 rounded-2xl bg-white p-6 shadow overflow-hidden flex flex-col">

                    <div className="mb-6 flex items-center justify-between gap-4 flex-shrink-0">

                        <EmployeeSearch
                            value={search}
                            onChange={setSearch}
                        />

                        <EmployeeFilters
                            department={department}
                            country={country}
                            onDepartmentChange={setDepartment}
                            onCountryChange={setCountry}
                        />

                    </div>

                    <div className="flex-1 overflow-hidden">

                        {(result?.items ?? []).length > 0 ? (
                            <EmployeeTable
                                employees={result?.items ?? []}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <div className="flex h-full min-h-[240px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-slate-600">
                                👤 No employees found.
                            </div>
                        )}

                    </div>

                    <div className="mt-6 flex justify-end flex-shrink-0">

                        <Pagination
                            page={result?.page ?? 1}
                            totalPages={result?.totalPages ?? 1}
                            onPageChange={setPage}
                        />

                    </div>

                </div>

            </div>

            <EmployeeModal
                open={isModalOpen}
                title={
                    editingEmployee
                        ? "Edit Employee"
                        : "Add Employee"
                }
                defaultValues={defaultValues}
                loading={
                    createMutation.isPending ||
                    updateMutation.isPending
                }
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                }}
                onSubmit={handleSubmit}
            />

            <DeleteDialog
                open={!!deleteEmployee}
                employeeName={
                    deleteEmployee
                        ? `${deleteEmployee.firstName} ${deleteEmployee.lastName}`
                        : ""
                }
                onCancel={() => setDeleteEmployee(null)}
                onConfirm={confirmDelete}
            />

        </PageContainer>
    );
}