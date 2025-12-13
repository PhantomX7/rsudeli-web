import { BannerForm } from "@admin/banner/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateBannerPage() {
    return (
        <PageLayout 
            title="Create Banner" 
            backLink="/admin/banner"
            backLabel="Back to Banners"
        >
            <BannerForm />
        </PageLayout>
    );
}