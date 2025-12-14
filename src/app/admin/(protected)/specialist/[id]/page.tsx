"use client";

import { use } from "react";
import { useSpecialist } from "@/hooks/admin/use-specialists";
import { SpecialistForm } from "@admin/specialist/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function SpecialistEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const specialistId = parseInt(id);
    const { data, isLoading, error, refetch } = useSpecialist(specialistId);

    return (
        <PageLayout
            title="Edit Specialist"
            backLink="/admin/specialist"
            backLabel="Back to Specialists"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/specialist"
                loadingText="Loading specialist..."
            >
                <SpecialistForm
                    initialData={data}
                    specialistId={specialistId}
                />
            </QueryStateHandler>
        </PageLayout>
    );
}
