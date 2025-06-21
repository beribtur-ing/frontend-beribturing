import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { Box } from '@mui/material';
import { AdminSidebar } from './admin/admin-sidebar';
import { AdminHeader } from './admin/admin-header';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && !location.pathname.includes('/login')) {
      navigate(`/login`);
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user && !location.pathname.includes('/login')) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, pt: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
