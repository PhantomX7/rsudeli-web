// app/admin/room/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/types/room";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue, formatPrice } from "@/lib/format";

interface RoomColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createRoomColumns({
    onDelete,
    isDeletePending = false,
}: RoomColumnsProps): ColumnDef<Room>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                return (
                    <Badge variant={type === "adult" ? "default" : "secondary"}>
                        {type === "adult" ? "Dewasa" : "Anak"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.getValue("price") as number;
                return (
                    <div className="font-medium text-green-600">
                        {formatPrice(price)}
                    </div>
                );
            },
        },
        {
            accessorKey: "display_order",
            header: "Order",
            cell: ({ row }) => row.getValue("display_order"),
        },
        {
            accessorKey: "created_at",
            header: "Created",
            cell: ({ row }) => {
                const date = row.getValue("created_at") as string;
                return formatDateTimeValue(new Date(date));
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const room = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/room/${room.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(room.id)}
                            description={`This will permanently delete the room "${room.name}".`}
                            isLoading={isDeletePending}
                        >
                            Delete
                        </ConfirmButton>
                    </div>
                );
            },
        },
    ];
}