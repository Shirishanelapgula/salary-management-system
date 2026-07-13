import PageContainer from "../components/layout/PageContainer";
import StatsGrid from "../components/dashboard/StatsGrid";
import DepartmentSalaryChart from "../components/dashboard/DepartmentSalaryChart";
import CountryDistributionChart from "../components/dashboard/CountryDistributionChart";
import HighestPaidTable from "../components/dashboard/HighestPaidTable";
import LowestPaidTable from "../components/dashboard/LowestPaidTable";

export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <div className="flex flex-col gap-6">

        <StatsGrid />

        <div className="grid gap-6 lg:grid-cols-2">
          <DepartmentSalaryChart />
          <CountryDistributionChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <HighestPaidTable />
          <LowestPaidTable />
        </div>

      </div>
    </PageContainer>
  );
}