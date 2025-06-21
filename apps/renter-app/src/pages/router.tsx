import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LocalizedLayout } from '~/components/localized-layout';

// Import pages
import HomePage from './HomePage';
import AuthSignInPage from './auth/AuthSignInPage';
import AuthSignUpPage from './auth/AuthSignUpPage';
import AuthForgotPasswordPage from './auth/AuthForgotPasswordPage';
import AuthResetPasswordPage from './auth/AuthResetPasswordPage';
import AuthVerifyOtpPage from './auth/AuthVerifyOtpPage';
import AuthPhoneSignInPage from './auth/AuthPhoneSignInPage';
import FavoritesPage from './FavoritesPage';
import PaymentsPage from './PaymentsPage';
import ProfilePage from './ProfilePage';
import RentalsPage from './RentalsPage';
import SettingsPage from './SettingsPage';
import ProductPage from './ProductPage';
import CategoryPage from './CategoryPage';

export const browserRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      path: '/',
      element: <LocalizedLayout />, // This will wrap everything and provide i18n
      children: [
        { index: true, element: <HomePage /> },
        { path: 'auth/signin', element: <AuthSignInPage /> },
        { path: 'auth/signup', element: <AuthSignUpPage /> },
        { path: 'auth/forgot-password', element: <AuthForgotPasswordPage /> },
        { path: 'auth/reset-password', element: <AuthResetPasswordPage /> },
        { path: 'auth/verify-otp', element: <AuthVerifyOtpPage /> },
        { path: 'auth/phone-signin', element: <AuthPhoneSignInPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'rentals', element: <RentalsPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'product/:id', element: <ProductPage /> },
        { path: 'category/*', element: <CategoryPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ],
  { basename: '/renter' },
);
