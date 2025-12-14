import { SpecialistList } from "@admin/specialist/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function SpecialistListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Specialists"
            description="Manage medical specialties"
            actions={
                <Button asChild>
                    <Link href="/admin/specialist/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Specialist
                    </Link>
                </Button>
            }
        >
            <SpecialistList params={params} />
        </PageLayout>
    );
}