// app/admin/facility/create/page.tsx
import { FacilityForm } from "@admin/facility/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateFacilityPage() {
    return (
        <PageLayout 
            title="Create Facility" 
            backLink="/admin/facility"
            backLabel="Back to Facilities"
        >
            <FacilityForm />
        </PageLayout>
    );
}