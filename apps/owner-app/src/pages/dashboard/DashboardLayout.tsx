import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/sidebar';
import { Header } from '../../components/dashboard/header';
import { AuthWrapper } from '../../components/auth/auth-wrapper';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
