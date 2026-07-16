import { useMemo, useState } from "react";

import PageContainer from "../components/layout/PageContainer";

import SalaryToolbar from "../components/salary/SalaryToolbar";
import SalaryTable from "../components/salary/SalaryTable";

import { useSalaries } from "../hooks/useSalaries";

import EditSalaryModal from "../components/salary/EditSalaryModal";
import DeleteSalaryDialog from "../components/salary/DeleteSalaryDialog";

import { useUpdateSalary } from "../hooks/useUpdateSalary";
import { useDeleteSalary } from "../hooks/useDeleteSalary";
// import type { Salary } from "../types/salary.types";

export default function SalaryPage() {
    const { data, isLoading, isError } = useSalaries();

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [country, setCountry] = useState("");

    const [selectedSalary, setSelectedSalary] = useState<any>(null);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const updateSalary = useUpdateSalary();

    const deleteSalary = useDeleteSalary();

    const handleEdit = (salary: any) => {
        setSelectedSalary(salary);
        setEditOpen(true);
    };

    const handleDelete = (salary: any) => {
        setSelectedSalary(salary);
        setDeleteOpen(true);
    };

    const filteredSalaries = useMemo(() => {
        const salaries = data?.data ?? data ?? [];

        return salaries.filter((salary: any) => {
            const fullName =
                `${salary.employee.firstName} ${salary.employee.lastName}`.toLowerCase();

            const matchesSearch =
                fullName.includes(search.toLowerCase());

            const matchesDepartment =
                department === "" ||
                salary.employee.department.name
                    .toLowerCase()
                    .includes(department.toLowerCase());

            const matchesCountry =
                country === "" ||
                salary.employee.country.name
                    .toLowerCase()
                    .includes(country.toLowerCase());

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesCountry
            );
        });
    }, [data, search, department, country]);

    if (isLoading) {
        return (
            <PageContainer title="Salary Management">
                <div className="flex min-h-[50vh] items-center justify-center">
                    Loading salaries...
                </div>
            </PageContainer>
        );
    }

    if (isError) {
        return (
            <PageContainer title="Salary Management">
                <div className="rounded-lg bg-red-100 p-6 text-red-600">
                    Failed to load salaries.
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Salary Management">

            <div className="flex flex-col gap-6">

                <SalaryToolbar
                    search={search}
                    department={department}
                    country={country}
                    onSearch={setSearch}
                    onDepartment={setDepartment}
                    onCountry={setCountry}
                />

                {filteredSalaries.length > 0 ? (
                    <SalaryTable
                        salaries={filteredSalaries}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className="flex min-h-[240px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-slate-600">
                        💰 No salary records found.
                    </div>
                )}

                <EditSalaryModal
                    open={editOpen}
                    salary={selectedSalary}
                    loading={updateSalary.isPending}
                    onClose={() => setEditOpen(false)}
                    onSubmit={(data) => {
                        updateSalary.mutate({
                            id: selectedSalary.id,
                            data,
                        });

                        setEditOpen(false);
                    }}
                />

                <DeleteSalaryDialog
                    open={deleteOpen}
                    loading={deleteSalary.isPending}
                    onClose={() => setDeleteOpen(false)}
                    onDelete={() => {
                        if (!window.confirm("Are you sure you want to delete this salary?")) {
                            return;
                        }

                        deleteSalary.mutate(selectedSalary.id);

                        setDeleteOpen(false);
                    }}
                />

            </div>

        </PageContainer>
    );
}