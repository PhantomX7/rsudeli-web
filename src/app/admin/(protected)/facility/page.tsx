// app/admin/facility/page.tsx
import { FacilityList } from "@admin/facility/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function FacilityListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Facilities"
            description="Manage your facilities"
            actions={
                <Button asChild>
                    <Link href="/admin/facility/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Facility
                    </Link>
                </Button>
            }
        >
            <FacilityList params={params} />
        </PageLayout>
    );
}