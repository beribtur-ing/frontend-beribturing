import { RevenueChart } from "../components/admin/revenue-chart";
import { TopPropertiesChart } from "../components/admin/top-properties-chart";
import { UserGrowthChart } from "../components/admin/user-growth-chart";
import { AnalyticsCards } from "../components/admin/analytics-cards";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track platform performance and user engagement metrics.</p>
      </div>

      <AnalyticsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      <TopPropertiesChart />
    </div>
  );
}