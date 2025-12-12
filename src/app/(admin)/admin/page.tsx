// app/admin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/admin/use-auth";
import { Loader2 } from "lucide-react";
import { PageLayout } from "@admin/page-layout";

export default function AdminDashboardPage() {
    const { user, isLoading } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
        // 2. Logic: If loading is done and user is a writer, redirect
        if (!isLoading && user?.role === "writer") {
            router.replace("/admin/blog");
        }
    }, [user, isLoading, router]);

    // 3. Prevent flashing: Show a loader if we are checking auth or redirecting
    if (isLoading || user?.role === "writer") {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // 4. If Admin or Root, show the actual dashboard
    return (
        <PageLayout
            title="Dashboard"
            description="Overview of your application statistics"
        >
            HI ADMIN
        </PageLayout>
    );
}