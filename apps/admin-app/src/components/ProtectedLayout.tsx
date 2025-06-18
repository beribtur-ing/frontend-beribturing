import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AdminSidebar } from "./admin/admin-sidebar";
import { AdminHeader } from "./admin/admin-header";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && !location.pathname.includes("/login")) {
      const locale = location.pathname.split('/')[1] || 'en';
      navigate(`/${locale}/login`);
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user && !location.pathname.includes("/login")) {
    return null;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}