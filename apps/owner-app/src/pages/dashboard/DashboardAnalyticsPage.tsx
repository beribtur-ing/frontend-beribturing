import { useEffect, useState } from "react";
import { StatCard } from "../../components/ui/stat-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export default function DashboardAnalyticsPage() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/revenue")
      .then((res) => res.json())
      .then((data) => {
        setRevenueData(data);
        setLoading(false);
      });
  }, []);

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const avgRevenue = totalRevenue / revenueData.length || 0;

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 h-24"></div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-96"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm md:text-base text-gray-600">Track your rental performance and revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+15% from last period"
          changeType="positive"
        />
        <StatCard title="Total Bookings" value={totalBookings} change="+8% from last period" changeType="positive" />
        <StatCard
          title="Average Monthly Revenue"
          value={`$${avgRevenue.toFixed(0)}`}
          change="+5% from last period"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Bookings by Month</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Bookings"]} />
                <Bar dataKey="bookings" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-blue-600">75%</p>
            <p className="text-xs md:text-sm text-gray-600">Occupancy Rate</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-green-600">$37.50</p>
            <p className="text-xs md:text-sm text-gray-600">Avg Daily Rate</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-purple-600">4.8</p>
            <p className="text-xs md:text-sm text-gray-600">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-orange-600">92%</p>
            <p className="text-xs md:text-sm text-gray-600">Response Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}