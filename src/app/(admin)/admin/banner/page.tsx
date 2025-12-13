// app/admin/banner/page.tsx
import { BannerList } from "@admin/banner/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function BannerListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Banners"
            description="Manage your banners"
            actions={
                <Button asChild>
                    <Link href="/admin/banner/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Banner
                    </Link>
                </Button>
            }
        >
            <BannerList params={params} />
        </PageLayout>
    );
}
