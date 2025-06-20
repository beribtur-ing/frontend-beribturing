import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './lib/auth';
import './globals.css';
import './i18n';
import React, { useMemo } from 'react';

const App = () => {
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="renter-app-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;