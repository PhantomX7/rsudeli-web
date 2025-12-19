// app/(public)/insurance/page.tsx
import { getPublicPaginatedInsurancesAction } from "@/actions/public/insurance";
import { InsurancePageClient } from "./page-client";

export default async function InsurancePage() {
    const result = await getPublicPaginatedInsurancesAction();
    const insurances = result.data ?? [];

    return <InsurancePageClient insurances={insurances} />;
}