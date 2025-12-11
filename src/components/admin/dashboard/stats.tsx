// @/components/admin/dashboard/stats.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatistics } from "@/hooks/admin/use-statistics";
import { Skeleton } from "@/components/ui/skeleton";
import { Box, User, Tag, FolderTree } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    isLoading: boolean;
}

function StatCard({ title, value, icon: Icon, isLoading }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {isLoading ? (
                        <Skeleton className="h-8 w-16" />
                    ) : (
                        value.toLocaleString()
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export function DashboardStats() {
    const { data: statistics, isLoading, error } = useStatistics();

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    {error.message || "Failed to load statistics"}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Products"
                value={statistics?.product_count || 0}
                icon={Box}
                isLoading={isLoading}
            />
            <StatCard
                title="Total Users"
                value={statistics?.user_count || 0}
                icon={User}
                isLoading={isLoading}
            />
            <StatCard
                title="Total Brands"
                value={statistics?.brand_count || 0}
                icon={Tag}
                isLoading={isLoading}
            />
            <StatCard
                title="Total Categories"
                value={statistics?.category_count || 0}
                icon={FolderTree}
                isLoading={isLoading}
            />
        </div>
    );
}
