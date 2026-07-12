import { useState } from "react";

import PageContainer from "../components/layout/PageContainer";

import EmployeeToolbar from "../components/employee/EmployeeToolBar";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeFilters from "../components/employee/EmployeeFilters";
import EmployeeSearch from "../components/employee/EmployeeSearch";
import Pagination from "../components/employee/Pagination";

import { useEmployees } from "../hooks/useEmployees";

export default function EmployeesPage() {
    const [page, setPage] = useState(1);

    const [search, setSearch] =
        useState("");

    const [
        department,
        setDepartment,
    ] = useState("");

    const [country, setCountry] =
        useState("");

    const { data, isLoading } =
        useEmployees({
            page,
            limit: 10,
            search,
            department,
            country,
        });

    if (isLoading) {
        return (
            <PageContainer title="Employees">
                Loading...
            </PageContainer>
        );
    }

    const result = data?.data;

    return (
        <PageContainer title="Employees">
            <EmployeeToolbar
                onAdd={() =>
                    alert("Open Employee Modal")
                }
            />

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    marginBottom: 20,
                }}
            >
                <EmployeeSearch
                    value={search}
                    onChange={setSearch}
                />

                <EmployeeFilters
                    department={department}
                    country={country}
                    onDepartmentChange={
                        setDepartment
                    }
                    onCountryChange={
                        setCountry
                    }
                />
            </div>

            <EmployeeTable
                employees={result?.items ?? []}
                onEdit={(id) =>
                    console.log("Edit", id)
                }
                onDelete={(id) =>
                    console.log("Delete", id)
                }
            />

            <Pagination
                page={result?.page ?? 1}
                totalPages={result?.totalPages ?? 1}
                onPageChange={setPage}
            />
        </PageContainer>
    );
}