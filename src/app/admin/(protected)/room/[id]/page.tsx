// app/admin/room/[id]/page.tsx
"use client";

import { use } from "react";
import { useRoom } from "@/hooks/admin/use-rooms";
import { RoomForm } from "@admin/room/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function RoomEditPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = use(params);
    const roomId = parseInt(id);
    const { data, isLoading, error, refetch } = useRoom(roomId);

    return (
        <PageLayout 
            title="Edit Room" 
            backLink="/admin/room"
            backLabel="Back to Rooms"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/room"
                loadingText="Loading room..."
            >
                <RoomForm initialData={data} roomId={roomId} />
            </QueryStateHandler>
        </PageLayout>
    );
}