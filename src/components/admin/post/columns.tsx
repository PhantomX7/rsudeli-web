// app/admin/post/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/types/post";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";
import Image from "next/image";

interface PostColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createPostColumns({
    onDelete,
    isDeletePending = false,
}: PostColumnsProps): ColumnDef<Post>[] {
    return [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="font-medium max-w-[300px] truncate" title={row.getValue("title")}>
                    {row.getValue("title")}
                </div>
            ),
        },
        {
            accessorKey: "thumbnail_url",
            header: "Thumbnail",
            cell: ({ row }) => {
                const url = row.getValue("thumbnail_url") as string;
                return (
                    <div className="relative w-16 h-12 overflow-hidden rounded bg-gray-100 border border-gray-200">
                        {url ? (
                            <Image
                                src={url}
                                alt={row.getValue("title")}
                                fill
                                sizes="64px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-xs text-gray-500">
                                No IMG
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
                    umum: "default",
                    akreditasi: "secondary",
                    artikel: "outline",
                };
                return (
                    <Badge variant={variants[type] || "outline"} className="capitalize">
                        {type}
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
                const post = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/post/${post.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(post.id)}
                            description={`This will permanently delete the post "${post.title}".`}
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