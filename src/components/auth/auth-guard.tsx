// components/auth/auth-guard.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/use-auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
    const { user, status } = useAdminAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Wait for loading or error states (connection errors handled globally)
        if (status === "loading" || status === "error") return;

        // Redirect to login only when unauthenticated
        if (status === "unauthenticated") {
            const params = new URLSearchParams({ from: pathname });
            router.replace(`/admin/login?${params.toString()}`);
            return;
        }

        // Check role authorization
        if (
            status === "authenticated" &&
            requiredRoles?.length &&
            user &&
            !requiredRoles.includes(user.role)
        ) {
            router.replace("/error/403");
        }
    }, [user, status, requiredRoles, router, pathname]);

    // Loading state
    if (status === "loading") {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                    Verifying session...
                </p>
            </div>
        );
    }

    // Error state - show children, banner handles error display
    // This allows users to see cached data while offline
    if (status === "error") {
        // If we have cached user data, still show the page
        if (user) {
            return <>{children}</>;
        }
        // No cached data, show loading (banner shows error)
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                    Connecting to server...
                </p>
            </div>
        );
    }

    // Unauthenticated (will redirect)
    if (status === "unauthenticated") {
        return null;
    }

    // Not authorized for this role
    if (requiredRoles?.length && user && !requiredRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
