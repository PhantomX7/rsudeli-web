import { SpecialistForm } from "@admin/specialist/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateSpecialistPage() {
    return (
        <PageLayout 
            title="Create Specialist" 
            backLink="/admin/specialist"
            backLabel="Back to Specialists"
        >
            <SpecialistForm />
        </PageLayout>
    );
}