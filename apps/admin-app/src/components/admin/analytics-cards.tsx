import { SystemStatCard } from "./system-stat-card"
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react"

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SystemStatCard
        title="Monthly Revenue"
        value="$28,450"
        icon={DollarSign}
        description="Revenue this month"
        trend="+12.5% from last month"
      />
      <SystemStatCard
        title="New Users"
        value="127"
        icon={Users}
        description="New registrations this month"
        trend="+8.2% from last month"
      />
      <SystemStatCard
        title="Bookings"
        value="342"
        icon={Calendar}
        description="Total bookings this month"
        trend="+15.3% from last month"
      />
      <SystemStatCard
        title="Growth Rate"
        value="23.1%"
        icon={TrendingUp}
        description="Platform growth rate"
        trend="+2.4% from last month"
      />
    </div>
  )
}
