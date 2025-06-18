import React from 'react';
import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';
import {Header} from '~/components/header';
import {Footer} from '~/components/footer';

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

const DefaultLayout = ({children}: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header/>
    <main className="flex-grow">
      {children}
    </main>
    <Footer/>
  </div>
);

export const browserRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace/>,
  },
  {
    path: '/:locale',
    element: (
      <DefaultLayout>
        <Outlet/>
      </DefaultLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'auth/signin',
        element: <AuthSignInPage/>,
      },
      {
        path: 'auth/signup',
        element: <AuthSignUpPage/>,
      },
      {
        path: 'auth/forgot-password',
        element: <AuthForgotPasswordPage/>,
      },
      {
        path: 'auth/reset-password',
        element: <AuthResetPasswordPage/>,
      },
      {
        path: 'auth/verify-otp',
        element: <AuthVerifyOtpPage/>,
      },
      {
        path: 'auth/phone-signin',
        element: <AuthPhoneSignInPage/>,
      },
      {
        path: 'favorites',
        element: <FavoritesPage/>,
      },
      {
        path: 'payments',
        element: <PaymentsPage/>,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      },
      {
        path: 'rentals',
        element: <RentalsPage/>,
      },
      {
        path: 'settings',
        element: <SettingsPage/>,
      },
      {
        path: 'product/:id',
        element: <ProductPage/>,
      },
      {
        path: 'category/*',
        element: <CategoryPage/>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/en" replace/>,
  },
], {basename: '/renter'});
