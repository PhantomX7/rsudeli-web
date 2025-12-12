"use client";

import "@/app/globals.css";
import "@/app/theme.css";

import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AuthGuard } from "@/components/auth/auth-guard";
import Breadcrumb from "@admin/breadcrumb";
import { AppSidebar, type NavMainItem } from "@admin/sidebar/app-sidebar"; // Import type
import { sidebarConfig } from "@/config/sidebar";
import { useAdminAuth } from "@/hooks/admin/use-auth";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAdminAuth();
  
  // The filtering is instant. The React Compiler will auto-memoize the result if needed.

  const navMain = (sidebarConfig.navMain || []).filter((item) => {
    // 1. If no roles defined, everyone sees it
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }

    // 2. If user exists and has a role, check if role is allowed
    if (user?.role) {
      return item.requiredRoles.includes(user.role);
    }

    return false;
  });

  const filteredSidebarConfig = {
    navMain: navMain as NavMainItem[],
  };

  return (
    <AuthGuard requiredRole={["admin", "root"]}>
      <SidebarProvider>
        <AppSidebar data={filteredSidebarConfig} />
        
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb />
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}