"use client";

import { use } from "react";
import { useDoctor } from "@/hooks/admin/use-doctors";
import { DoctorForm } from "@admin/doctor/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function DoctorEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const doctorId = parseInt(id);
    const { data, isLoading, error, refetch } = useDoctor(doctorId);

    return (
        <PageLayout
            title="Edit Doctor"
            backLink="/admin/doctor"
            backLabel="Back to Doctors"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/doctor"
                loadingText="Loading doctor data..."
            >
                <DoctorForm initialData={data} doctorId={doctorId} />
            </QueryStateHandler>
        </PageLayout>
    );
}
