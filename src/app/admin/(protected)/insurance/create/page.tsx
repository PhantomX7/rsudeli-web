// app/admin/insurance/create/page.tsx
import { InsuranceForm } from "@admin/insurance/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateInsurancePage() {
    return (
        <PageLayout 
            title="Create Insurance" 
            backLink="/admin/insurance"
            backLabel="Back to Insurances"
        >
            <InsuranceForm />
        </PageLayout>
    );
}