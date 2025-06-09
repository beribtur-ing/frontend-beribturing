"use client"
import React, {useEffect} from "react";
import {useAuth} from "@/lib/auth";
import {usePathname, useRouter} from "@/i18n/navigation";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AdminSidebar} from "@/components/admin/admin-sidebar";
import {AdminHeader} from "@/components/admin/admin-header";

export function ProtectedLayout({children}: { children: React.ReactNode }) {
  //
  const {user, loading} = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user && pathname !== `/login`) {
    return null
  }

  if (pathname === "/login") {
    return children
  }

  return (
    <SidebarProvider>
      <AdminSidebar/>
      <SidebarInset>
        <AdminHeader/>
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
