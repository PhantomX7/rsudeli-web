import { LayoutDashboard, User, Image, Cog } from "lucide-react";

// Helper constants to ensure consistency
const ROLES = {
    ROOT: "root",
    ADMIN: "admin",
    WRITER: "writer",
};

const ROLE_GROUPS = {
    ALL: [ROLES.ROOT, ROLES.ADMIN, ROLES.WRITER],
    ADMIN_ROOT: [ROLES.ROOT, ROLES.ADMIN],
    ROOT_ONLY: [ROLES.ROOT],
};

const createNavItem = (
    title: string,
    icon: unknown,
    items: { title: string; url: string }[],
    url: string = "#",
    requiredRoles: string[] = []
) => ({
    title,
    url,
    icon,
    items,
    requiredRoles,
});

export const sidebarConfig = {
    navMain: [
        // CHANGE: Dashboard is now only for Admin & Root
        // Writers will not see this link
        createNavItem(
            "Dashboard",
            LayoutDashboard,
            [],
            "/admin",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        // Admin & Root Only
        createNavItem(
            "User",
            User,
            [{ title: "List", url: "/admin/user" }],
            "#",
            ROLE_GROUPS.ROOT_ONLY
        ),

        createNavItem(
            "Banner",
            Image,
            [
                { title: "List", url: "/admin/banner" },
                { title: "Create", url: "/admin/banner/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Specialist",
            User,
            [
                { title: "List", url: "/admin/specialist" },
                { title: "Create", url: "/admin/specialist/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Doctor",
            User,
            [
                { title: "List", url: "/admin/doctor" },
                { title: "Create", url: "/admin/doctor/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Facility",
            User,
            [
                { title: "List", url: "/admin/facility" },
                { title: "Create", url: "/admin/facility/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Room",
            User,
            [
                { title: "List", url: "/admin/room" },
                { title: "Create", url: "/admin/room/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Insurance",
            User,
            [
                { title: "List", url: "/admin/insurance" },
                { title: "Create", url: "/admin/insurance/create" },
            ],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),

        createNavItem(
            "Config",
            Cog,
            [{ title: "List", url: "/admin/config" }],
            "#",
            ROLE_GROUPS.ADMIN_ROOT
        ),
    ],
};
