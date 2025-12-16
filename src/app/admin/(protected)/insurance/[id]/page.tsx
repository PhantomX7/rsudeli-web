// app/admin/insurance/[id]/page.tsx
"use client";

import { use } from "react";
import { useInsurance } from "@/hooks/admin/use-insurances";
import { InsuranceForm } from "@admin/insurance/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function InsuranceEditPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = use(params);
    const insuranceId = parseInt(id);
    const { data, isLoading, error, refetch } = useInsurance(insuranceId);

    return (
        <PageLayout 
            title="Edit Insurance" 
            backLink="/admin/insurance"
            backLabel="Back to Insurances"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/insurance"
                loadingText="Loading insurance..."
            >
                <InsuranceForm initialData={data} insuranceId={insuranceId} />
            </QueryStateHandler>
        </PageLayout>
    );
}