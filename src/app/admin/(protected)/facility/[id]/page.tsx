// app/admin/facility/[id]/page.tsx
"use client";

import { use } from "react";
import { useFacility } from "@/hooks/admin/use-facilities";
import { FacilityForm } from "@admin/facility/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function FacilityEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const facilityId = parseInt(id);
    const { data, isLoading, error, refetch } = useFacility(facilityId);

    return (
        <PageLayout
            title="Edit Facility"
            backLink="/admin/facility"
            backLabel="Back to Facilities"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/facility"
                loadingText="Loading facility..."
            >
                <FacilityForm initialData={data} facilityId={facilityId} />
            </QueryStateHandler>
        </PageLayout>
    );
}
