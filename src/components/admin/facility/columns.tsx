// app/admin/facility/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Facility } from "@/types/facility";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";
import Image from "next/image";

interface FacilityColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createFacilityColumns({
    onDelete,
    isDeletePending = false,
}: FacilityColumnsProps): ColumnDef<Facility>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "icon_url",
            header: "Icon",
            cell: ({ row }) => {
                const iconUrl = row.getValue("icon_url") as string;
                return (
                    <div className="relative w-12 h-12 overflow-hidden rounded bg-gray-100">
                        {iconUrl ? (
                            <Image
                                src={iconUrl}
                                alt={row.getValue("name")}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                            />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-xs text-gray-500">
                                No icon
                            </div>
                        )}
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
            accessorKey: "is_active",
            header: "Status",
            cell: ({ row }) => {
                const isActive = row.getValue("is_active");
                return (
                    <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Inactive"}
                    </Badge>
                );
            },
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
                const facility = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/facility/${facility.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(facility.id)}
                            description={`This will permanently delete the facility "${facility.name}".`}
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