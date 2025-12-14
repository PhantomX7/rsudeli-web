import { DoctorList } from "@admin/doctor/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DoctorListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Doctors"
            description="Manage doctor profiles and schedules"
            actions={
                <Button asChild>
                    <Link href="/admin/doctor/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Doctor
                    </Link>
                </Button>
            }
        >
            <DoctorList params={params} />
        </PageLayout>
    );
}
