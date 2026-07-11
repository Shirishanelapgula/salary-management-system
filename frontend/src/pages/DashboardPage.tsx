import PageContainer from "../components/layout/PageContainer";
import StatsGrid from "../components/dashboard/StatsGrid";

export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <StatsGrid />
    </PageContainer>
  );
}