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
import DashboardRentalsPage from '~/pages/dashboard/rentals/DashboardRentalsPage';
import DashboardRentalsCalendarPage from '~/pages/dashboard/rentals/DashboardRentalsCalendarPage';
import DashboardPropertiesPage from './dashboard/DashboardPropertiesPage';
import DashboardPropertiesAddPage from './dashboard/properties/DashboardPropertiesAddPage';
import DashboardPropertiesEditPage from './dashboard/properties/DashboardPropertiesEditPage';
import DashboardRequestsPage from './dashboard/DashboardRequestsPage';
import DashboardRequestDetailsPage from './dashboard/requests/DashboardRequestDetailsPage';
import DashboardSettingsPage from './dashboard/DashboardSettingsPage';

const PublicLayout = ({ children }: { children: React.ReactNode }) => <div className="min-h-screen">{children}</div>;

export const browserRouter = createBrowserRouter(
  [
    {
      path: '/',
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
            { index: true, element: <DashboardPage /> },
            { path: 'overview', element: <DashboardOverviewPage /> },
            { path: 'analytics', element: <DashboardAnalyticsPage /> },
            { path: 'rentals', element: <DashboardRentalsPage /> },
            { path: 'rentals/calendar', element: <DashboardRentalsCalendarPage /> },
            { path: 'properties', element: <DashboardPropertiesPage /> },
            { path: 'properties/add', element: <DashboardPropertiesAddPage /> },
            { path: 'properties/edit/:id', element: <DashboardPropertiesEditPage /> },
            { path: 'requests', element: <DashboardRequestsPage /> },
            { path: 'requests/:id', element: <DashboardRequestDetailsPage /> },
            { path: 'settings', element: <DashboardSettingsPage /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  { basename: '/owner' },
);
