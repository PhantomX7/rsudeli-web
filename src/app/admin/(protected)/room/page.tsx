// app/admin/room/page.tsx
import { RoomList } from "@admin/room/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function RoomListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Rooms"
            description="Manage room types and pricing"
            actions={
                <Button asChild>
                    <Link href="/admin/room/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Room
                    </Link>
                </Button>
            }
        >
            <RoomList params={params} />
        </PageLayout>
    );
}