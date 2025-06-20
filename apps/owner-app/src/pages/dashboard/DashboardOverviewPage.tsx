import {useEffect, useState} from "react";
import type {DashboardStats} from "../../lib/types";
import {
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {StatCard} from "../../components/dashboard/StatCard";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return <div>Error loading stats</div>;

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm md:text-base text-gray-600">Welcome back! Here's what's happening with your rentals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          change="+2 this month"
          changeType="positive"
          icon={<BuildingOfficeIcon className="w-6 h-6 md:w-8 md:h-8"/>}
        />
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings}
          change="3 ending soon"
          changeType="neutral"
          icon={<CalendarDaysIcon className="w-6 h-6 md:w-8 md:h-8"/>}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue}`}
          change="+12% from last month"
          changeType="positive"
          icon={<CurrencyDollarIcon className="w-6 h-6 md:w-8 md:h-8"/>}
        />
        <StatCard
          title="Messages"
          value={stats.pendingMessages}
          change="2 unread"
          changeType="neutral"
          icon={<ChatBubbleLeftRightIcon className="w-6 h-6 md:w-8 md:h-8"/>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New booking confirmed</p>
                <p className="text-xs text-gray-500">Canon EOS R5 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Payment received</p>
                <p className="text-xs text-gray-500">$200 • 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New message</p>
                <p className="text-xs text-gray-500">From Sarah Johnson • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Occupancy Rate</span>
              <span className="text-sm font-medium text-gray-900">{stats.occupancyRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${stats.occupancyRate}%`}}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-sm font-medium text-gray-900">${stats.totalRevenue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Daily Rate</span>
              <span className="text-sm font-medium text-gray-900">$37.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
