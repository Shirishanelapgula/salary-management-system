import DashboardCard from "./DashboardCard";
import { useDashboardSummary } from "../../hooks/useDashboard";

export default function StatsGrid() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  const summary = data?.data ?? data;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
      }}
    >
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
        title="Average Salary"
        value={summary.averageSalary}
      />
    </div>
  );
}