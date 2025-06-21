import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ProtectedLayout } from '~/components/ProtectedLayout';

export const LocaleLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

// Pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import OverviewPage from './OverviewPage';
import AnalyticsPage from './AnalyticsPage';
import BookingsPage from './BookingsPage';
import BookingDetailsPage from './BookingDetailsPage';
import ProfilePage from './ProfilePage';
import ProfileSettingsPage from './ProfileSettingsPage';
import PropertiesPage from './PropertiesPage';
import PropertyDetailsPage from './PropertyDetailsPage';
import PropertyEditPage from './PropertyEditPage';
import SettingsPage from './SettingsPage';
import UsersPage from './UsersPage';
import UserDetailsPage from './UserDetailsPage';
import UserEditPage from './UserEditPage';
import UserCreatePage from './UserCreatePage';

export const browserRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <LocaleLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedLayout>
              <HomePage />
            </ProtectedLayout>
          ),
        },
        { path: 'login', element: <LoginPage /> },
        {
          path: 'overview',
          element: (
            <ProtectedLayout>
              <OverviewPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'analytics',
          element: (
            <ProtectedLayout>
              <AnalyticsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'bookings',
          element: (
            <ProtectedLayout>
              <BookingsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'bookings/:id',
          element: (
            <ProtectedLayout>
              <BookingDetailsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'profile/settings',
          element: (
            <ProtectedLayout>
              <ProfileSettingsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'properties',
          element: (
            <ProtectedLayout>
              <PropertiesPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'properties/:id',
          element: (
            <ProtectedLayout>
              <PropertyDetailsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'properties/:id/edit',
          element: (
            <ProtectedLayout>
              <PropertyEditPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'settings',
          element: (
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'users',
          element: (
            <ProtectedLayout>
              <UsersPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'users/create',
          element: (
            <ProtectedLayout>
              <UserCreatePage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'users/:id',
          element: (
            <ProtectedLayout>
              <UserDetailsPage />
            </ProtectedLayout>
          ),
        },
        {
          path: 'users/:id/edit',
          element: (
            <ProtectedLayout>
              <UserEditPage />
            </ProtectedLayout>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  { basename: '/admin' },
);
