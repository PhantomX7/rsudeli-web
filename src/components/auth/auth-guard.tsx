// components/auth/auth-guard.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/use-auth";
import { useAdminAuthStore } from "@/stores/admin-auth-store";
import { logoutAction } from "@/actions/admin/auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: string | string[];
}

const LOADING_TIMEOUT_MS = 10000;

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
    const { user, isLoading } = useAdminAuth();
    const { logout: clientLogout } = useAdminAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    // Timeout Logic (Force Server Cleanup)
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isLoading) {
            timeoutId = setTimeout(async () => {
                toast.error("Connection timed out. Please login again.");

                clientLogout();

                await logoutAction();

                router.replace("/admin/login");
            }, LOADING_TIMEOUT_MS);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isLoading, clientLogout, router]);

    // Auth & Role Logic
    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            // If user is missing but we are on a protected page,
            // ensure cookies are gone and redirect.
            const handleRedirect = async () => {
                if (pathname !== "/admin/login") {
                    await logoutAction(); // Ensure cookies are cleared
                    const params = new URLSearchParams([["from", pathname]]);
                    router.replace(`/admin/login?${params.toString()}`);
                }
            };
            handleRedirect();
            return;
        }

        if (requiredRole) {
            const allowedRoles = Array.isArray(requiredRole)
                ? requiredRole
                : [requiredRole];

            if (!allowedRoles.includes(user.role)) {
                router.replace("/error/403");
            }
        }
    }, [user, isLoading, requiredRole, router, pathname]);

    if (isLoading || !user) {
        return (
            <div className="flex h-screen w-full flex-col gap-4 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">
                    Verifying session...
                </p>
            </div>
        );
    }

    if (requiredRole) {
        const allowedRoles = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole];
        if (!allowedRoles.includes(user.role)) return null;
    }

    return <>{children}</>;
}
