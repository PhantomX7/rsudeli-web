// @/components/admin/sidebar/app-sidebar.tsx
"use client";

import * as React from "react";
import { Command } from "lucide-react";
import { NavMain } from "@admin/sidebar/nav-main";
import { NavUser } from "@admin/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavItem {
    title: string;
    url: string;
}

interface NavMainItem {
    title: string;
    url: string;
    icon: LucideIcon;
    items: NavItem[];
}

interface SidebarData {
    navMain: NavMainItem[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    data: SidebarData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Komputer Medan
                                    </span>
                                    <span className="truncate text-xs">
                                        Admin Panel
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}