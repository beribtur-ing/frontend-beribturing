import React from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ProtectedLayout } from '~/components/ProtectedLayout';

// Import pages
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
import SettingsPage from './SettingsPage';
import UsersPage from './UsersPage';
import UserDetailsPage from './UserDetailsPage';
import UserEditPage from './UserEditPage';
import UserCreatePage from './UserCreatePage';

// Import messages
import enMessages from '~/messages/en.json';
import ruMessages from '~/messages/ru.json';
import uzMessages from '~/messages/uz.json';

const messages = {
  en: enMessages,
  ru: ruMessages,
  uz: uzMessages,
};

const LocaleLayout = () => {
  const getLocaleFromPath = () => {
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    return localeMatch ? localeMatch[1] : 'en';
  };

  const [locale, setLocale] = React.useState(getLocaleFromPath());

  React.useEffect(() => {
    const handleLocationChange = () => {
      setLocale(getLocaleFromPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const currentMessages = messages[locale as keyof typeof messages] || messages.en;

  return (
    <IntlProvider locale={locale} messages={currentMessages}>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </IntlProvider>
  );
};

export const browserRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/:locale',
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
      {
        path: 'login',
        element: <LoginPage />,
      },
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
      {
        path: 'users/create',
        element: (
          <ProtectedLayout>
            <UserCreatePage />
          </ProtectedLayout>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/en" replace />,
  },
], { basename: '/admin' });
