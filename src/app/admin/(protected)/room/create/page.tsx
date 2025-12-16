// app/admin/room/create/page.tsx
import { RoomForm } from "@admin/room/form";
import { PageLayout } from "@admin/page-layout";

export default function CreateRoomPage() {
    return (
        <PageLayout 
            title="Create Room" 
            backLink="/admin/room"
            backLabel="Back to Rooms"
        >
            <RoomForm />
        </PageLayout>
    );
}