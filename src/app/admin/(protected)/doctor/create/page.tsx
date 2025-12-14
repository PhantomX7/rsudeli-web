import { DoctorForm } from "@admin/doctor/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateDoctorPage() {
    return (
        <PageLayout
            title="Add New Doctor"
            backLink="/admin/doctor"
            backLabel="Back to Doctors"
        >
            <DoctorForm />
        </PageLayout>
    );
}
