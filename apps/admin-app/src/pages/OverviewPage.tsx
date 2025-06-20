import { SystemStatCard } from "../components/admin/system-stat-card";
import { RecentActivity } from "../components/admin/recent-activity";
import { QuickActions } from "../components/admin/quick-actions";
import { mockSystemStats } from "../lib/mock-data";
import { Users, Calendar, DollarSign, AlertTriangle, Building2, MessageSquare } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">Monitor your rental platform's performance and manage key metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SystemStatCard
          title="Total Users"
          value={mockSystemStats.totalUsers.toLocaleString()}
          icon={Users}
          description="Registered lendees and lenders"
          trend="+12% from last month"
        />
        <SystemStatCard
          title="Active Rentals"
          value={mockSystemStats.activeRentals.toString()}
          icon={Calendar}
          description="Currently ongoing rentals"
          trend="+5% from last week"
        />
        <SystemStatCard
          title="Total Revenue"
          value={`$${mockSystemStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="Platform revenue this month"
          trend="+18% from last month"
        />
        <SystemStatCard
          title="Pending Approvals"
          value={mockSystemStats.pendingApprovals.toString()}
          icon={AlertTriangle}
          description="Properties awaiting approval"
          trend="3 new today"
          variant="warning"
        />
        <SystemStatCard
          title="Total Properties"
          value={mockSystemStats.totalProperties.toString()}
          icon={Building2}
          description="Listed properties on platform"
          trend="+8% from last month"
        />
        <SystemStatCard
          title="Support Tickets"
          value={mockSystemStats.supportTickets.toString()}
          icon={MessageSquare}
          description="Open support requests"
          trend="2 resolved today"
          variant="info"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}