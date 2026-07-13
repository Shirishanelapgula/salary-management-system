import DashboardCard from "./DashboardCard";
import { useDashboard } from "../../hooks/useDashboard";

export default function StatsGrid() {
    const { data, isLoading } = useDashboard();

    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow">
                Loading dashboard...
            </div>
        );
    }

    const summary = data?.data;

    if (!summary) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow">
                No dashboard data available.
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
                title="Employees"
                value={summary.totalEmployees}
            />

            <DashboardCard
                title="Departments"
                value={summary.totalDepartments}
            />

            <DashboardCard
                title="Countries"
                value={summary.totalCountries}
            />

            <DashboardCard
                title="Total Payroll"
                value={`₹ ${summary.totalSalary.toLocaleString()}`}
            />
        </div>
    );
}