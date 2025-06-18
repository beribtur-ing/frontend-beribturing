import React from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { AuthWrapper } from '~/components/auth/auth-wrapper';

// Import pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardPage from './dashboard/DashboardPage';
import DashboardOverviewPage from './dashboard/DashboardOverviewPage';
import DashboardAnalyticsPage from './dashboard/DashboardAnalyticsPage';
import DashboardBookingsPage from './dashboard/DashboardBookingsPage';
import DashboardBookingsCalendarPage from './dashboard/bookings/DashboardBookingsCalendarPage';
import DashboardPropertiesPage from './dashboard/DashboardPropertiesPage';
import DashboardPropertiesAddPage from './dashboard/properties/DashboardPropertiesAddPage';
import DashboardPropertiesEditPage from './dashboard/properties/DashboardPropertiesEditPage';
import DashboardRequestsPage from './dashboard/DashboardRequestsPage';
import DashboardRequestDetailsPage from './dashboard/requests/DashboardRequestDetailsPage';
import DashboardSettingsPage from './dashboard/DashboardSettingsPage';

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/:locale',
    element: (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: (
          <AuthWrapper>
            <DashboardLayout />
          </AuthWrapper>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'overview',
            element: <DashboardOverviewPage />,
          },
          {
            path: 'analytics',
            element: <DashboardAnalyticsPage />,
          },
          {
            path: 'bookings',
            element: <DashboardBookingsPage />,
          },
          {
            path: 'bookings/calendar',
            element: <DashboardBookingsCalendarPage />,
          },
          {
            path: 'properties',
            element: <DashboardPropertiesPage />,
          },
          {
            path: 'properties/add',
            element: <DashboardPropertiesAddPage />,
          },
          {
            path: 'properties/edit/:id',
            element: <DashboardPropertiesEditPage />,
          },
          {
            path: 'requests',
            element: <DashboardRequestsPage />,
          },
          {
            path: 'requests/:id',
            element: <DashboardRequestDetailsPage />,
          },
          {
            path: 'settings',
            element: <DashboardSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
], { basename: '/owner' });