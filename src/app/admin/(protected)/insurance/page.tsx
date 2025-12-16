// app/admin/insurance/page.tsx
import { InsuranceList } from "@admin/insurance/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function InsuranceListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Insurances"
            description="Manage insurance partners"
            actions={
                <Button asChild>
                    <Link href="/admin/insurance/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Insurance
                    </Link>
                </Button>
            }
        >
            <InsuranceList params={params} />
        </PageLayout>
    );
}