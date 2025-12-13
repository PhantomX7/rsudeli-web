"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Banner } from "@/types/banner";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";
import Image from "next/image";

interface BannerColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createBannerColumns({
    onDelete,
    isDeletePending = false,
}: BannerColumnsProps): ColumnDef<Banner>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "key",
            header: "Key",
            cell: ({ row }) => row.getValue("key"),
        },
        {
            accessorKey: "image_url",
            header: "Image",
            cell: ({ row }) => {
                const imageUrl = row.getValue("image_url") as string;
                return (
                    <div className="relative w-28 h-16 overflow-hidden rounded bg-gray-100">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={row.getValue("name")}
                                fill // Required for external URLs when width/height aren't known
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-xs text-gray-500">
                                No image
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
                const banner = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/banner/${banner.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(banner.id)}
                            description={`This will permanently delete the banner "${banner.name}".`}
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