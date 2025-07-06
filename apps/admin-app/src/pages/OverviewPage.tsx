import {SystemStatCard} from '~/components/admin/system-stat-card';
import {RecentActivity} from '~/components/admin/recent-activity';
import {QuickActions} from '~/components/admin/quick-actions';
import {Users, Calendar, DollarSign, AlertTriangle, Building2, MessageSquare} from 'lucide-react';
import {useOverallStatistics} from '~/hooks';

export default function OverviewPage() {
  //
  const {adminStatistics} = useOverallStatistics();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">Monitor your rental platform's performance and manage key metrics.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SystemStatCard
          title="Total Users"
          value={adminStatistics?.totalUsersCount || 0}
          icon={Users}
          description="Registered lendees and lenders"
          trend=""
        />
        <SystemStatCard
          title="Active Rentals"
          value={adminStatistics?.activeRentalsCount || 0}
          icon={Calendar}
          description="Currently ongoing rentals"
          trend=""
        />
        <SystemStatCard
          title="Total Revenue"
          value={`$${adminStatistics?.totalRevenue || 0}`}
          icon={DollarSign}
          description="Platform revenue this month"
          trend=""
        />
        <SystemStatCard
          title="Pending Approvals"
          value={adminStatistics?.pendingApprovalsCount || 0}
          icon={AlertTriangle}
          description="Properties awaiting approval"
          trend=""
        />
        <SystemStatCard
          title="Total Properties"
          value={adminStatistics?.totalPropertiesCount || 0}
          icon={Building2}
          description="Listed properties on platform"
          trend=""
        />
        <SystemStatCard
          title="Support Tickets"
          value={adminStatistics?.supportedTicketsCount || 0}
          icon={MessageSquare}
          description="Open support requests"
          trend=""
          variant="info"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity/>
        <QuickActions/>
      </div>
    </div>
  );
}
