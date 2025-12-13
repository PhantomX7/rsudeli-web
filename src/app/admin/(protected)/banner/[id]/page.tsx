// app/admin/banner/[id]/page.tsx
"use client";

import { use } from "react";
import { useBanner } from "@/hooks/admin/use-banners";
import { BannerForm } from "@admin/banner/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function BannerEditPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = use(params);
    const bannerId = parseInt(id);
    const { data, isLoading, error, refetch } = useBanner(bannerId);

    return (
        <PageLayout 
            title="Edit Banner" 
            backLink="/admin/banner"
            backLabel="Back to Banners"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/banner"
                loadingText="Loading banner..."
            >
                <BannerForm initialData={data} bannerId={bannerId} />
            </QueryStateHandler>
        </PageLayout>
    );
}