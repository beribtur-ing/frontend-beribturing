import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './pages/router';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './lib/auth';
import React, { useMemo } from 'react';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

const App = () => {
  const router = useMemo(() => browserRouter, []);
  const queryClient = useMemo(() => new QueryClient(), []);

  axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('owner_tokens') || '{}')?.accessToken; // or use your auth state/store
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="owner-app-theme">
        <SnackbarProvider classes={{ containerAnchorOriginTopRight: 'custom-snackbar' }}>
          <AuthProvider>
            <RouterProvider router={router}/>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
