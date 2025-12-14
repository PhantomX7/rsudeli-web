// components/auth/auth-guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/use-auth";
import { Loader2, WifiOff, RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

const FORCE_LOGOUT_DELAY_MS = 5000;

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
    const { user, status, error, refetch, forceLogout } = useAdminAuth();
    const router = useRouter();
    const pathname = usePathname();

    const [showForceLogout, setShowForceLogout] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Show force logout after delay in error/loading state
    useEffect(() => {
        if (status !== "error" && status !== "loading") {
            setShowForceLogout(false);
            return;
        }

        const timer = setTimeout(() => {
            setShowForceLogout(true);
        }, FORCE_LOGOUT_DELAY_MS);

        return () => clearTimeout(timer);
    }, [status]);

    // Handle redirects
    useEffect(() => {
        if (status === "loading" || status === "error") return;

        if (status === "unauthenticated") {
            const params = new URLSearchParams({ from: pathname });
            router.replace(`/admin/login?${params.toString()}`);
            return;
        }

        if (
            requiredRoles?.length &&
            user &&
            !requiredRoles.includes(user.role)
        ) {
            router.replace("/error/403");
        }
    }, [user, status, requiredRoles, router, pathname]);

    const handleForceLogout = async () => {
        setIsLoggingOut(true);
        await forceLogout();
    };

    // Loading state
    if (status === "loading") {
        return (
            <FullScreenMessage
                icon={<Loader2 className="h-8 w-8 animate-spin text-primary" />}
                title={
                    showForceLogout
                        ? "Taking longer than expected..."
                        : "Verifying session..."
                }
                showForceLogout={showForceLogout}
                isLoggingOut={isLoggingOut}
                onForceLogout={handleForceLogout}
            />
        );
    }

    // Error state without cached user
    if (status === "error" && !user) {
        return (
            <FullScreenMessage
                icon={
                    <div className="rounded-full bg-destructive/10 p-4">
                        <WifiOff className="h-8 w-8 text-destructive" />
                    </div>
                }
                title="Connection Error"
                description={error || "Unable to connect to the server"}
                showForceLogout={showForceLogout}
                isLoggingOut={isLoggingOut}
                onForceLogout={handleForceLogout}
                onRetry={refetch}
            />
        );
    }

    // Error state with cached user - show page with banner
    if (status === "error" && user) {
        return <>{children}</>;
    }

    // Unauthenticated (redirecting)
    if (status === "unauthenticated") {
        return null;
    }

    // Unauthorized role
    if (requiredRoles?.length && user && !requiredRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}

interface FullScreenMessageProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    showForceLogout: boolean;
    isLoggingOut: boolean;
    onForceLogout: () => void;
    onRetry?: () => void;
}

function FullScreenMessage({
    icon,
    title,
    description,
    showForceLogout,
    isLoggingOut,
    onForceLogout,
    onRetry,
}: FullScreenMessageProps) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
            {icon}
            <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    {title}
                </p>
                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {(showForceLogout || onRetry) && (
                <div className="mt-2 flex flex-col items-center gap-3">
                    {onRetry && (
                        <div className="flex gap-2">
                            <Button size="sm" onClick={onRetry}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </div>
                    )}

                    {showForceLogout && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onForceLogout}
                            disabled={isLoggingOut}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            {isLoggingOut ? "Logging out..." : "Force Logout"}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
