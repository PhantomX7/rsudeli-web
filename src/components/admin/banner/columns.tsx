"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Banner } from "@/types/banner";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";

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
                    <div className="w-28 h-16 relative">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={row.getValue("name")}
                                className="w-full h-full object-cover rounded"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                No image
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "link_url",
            header: "Link",
            cell: ({ row }) => {
                const linkUrl = row.getValue("link_url") as string;
                return linkUrl ? (
                    <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate block max-w-[200px]"
                    >
                        {linkUrl}
                    </a>
                ) : (
                    <span className="text-gray-400">No link</span>
                );
            },
        },
        {
            accessorKey: "display_order",
            header: "Display Order",
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
