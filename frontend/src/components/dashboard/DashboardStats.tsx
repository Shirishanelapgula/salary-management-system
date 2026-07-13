import {
  UsersIcon,
  BuildingOfficeIcon,
  GlobeAsiaAustraliaIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import StatCard from "./StatCard";
import type { DashboardStats as Stats } from "../../types/dashboard.types";

interface Props {
  stats: Stats;
}

export default function DashboardStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Employees"
        value={stats.totalEmployees}
        icon={<UsersIcon className="h-6 w-6" />}
      />

      <StatCard
        title="Departments"
        value={stats.totalDepartments}
        icon={<BuildingOfficeIcon className="h-6 w-6" />}
      />

      <StatCard
        title="Countries"
        value={stats.totalCountries}
        icon={<GlobeAsiaAustraliaIcon className="h-6 w-6" />}
      />

      <StatCard
        title="Monthly Payroll"
        value={`₹ ${stats.monthlyPayroll.toLocaleString()}`}
        icon={<BanknotesIcon className="h-6 w-6" />}
      />

    </div>
  );
}