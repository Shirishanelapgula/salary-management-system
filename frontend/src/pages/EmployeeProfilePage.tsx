import { Link, useParams } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";

import EmployeeHeader from "../components/employee-profile/EmployeeHeader";
import EmployeeInfoCard from "../components/employee-profile/EmployeeInfoCard";
import CurrentSalaryCard from "../components/employee-profile/CurrentSalaryCard";
import SalaryTrendCard from "../components/employee-profile/SalaryTrendCard";
import SalaryHistoryTable from "../components/employee-profile/SalaryHistoryTable";

import { useEmployeeProfile } from "../hooks/useEmployeeProfile";

export default function EmployeeProfilePage() {
  const { id } = useParams();

  const employeeId = Number(id);

  const { data, isLoading, isError } =
    useEmployeeProfile(employeeId);

  if (isLoading) {
    return (
      <PageContainer title="Employee Profile">
        <div className="flex min-h-[50vh] items-center justify-center">
          Loading...
        </div>
      </PageContainer>
    );
  }

  if (isError || !data) {
    return (
      <PageContainer title="Employee Profile">
        <div className="rounded-xl bg-red-50 p-6 text-red-600">
          Failed to load employee profile.
        </div>
      </PageContainer>
    );
  }

  const profile = data.data ?? data;

  return (
    <PageContainer title="Employee Profile">
      <div className="flex flex-col gap-6">

        <div>
          <Link
            to="/employees"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Employees
          </Link>
        </div>

        <EmployeeHeader
          employee={profile.employee}
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <EmployeeInfoCard
            employee={profile.employee}
          />

          <CurrentSalaryCard
            salary={profile.currentSalary}
          />

        </div>

        <SalaryTrendCard
          history={profile.salaryHistory}
        />

        <SalaryHistoryTable
          history={profile.salaryHistory}
        />

      </div>
    </PageContainer>
  );
}