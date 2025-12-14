"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Doctor } from "@/types/doctor";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import Image from "next/image";

interface DoctorColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createDoctorColumns({
    onDelete,
    isDeletePending = false,
}: DoctorColumnsProps): ColumnDef<Doctor>[] {
    return [
        {
            accessorKey: "image_url",
            header: "Photo",
            cell: ({ row }) => {
                const imageUrl = row.getValue("image_url") as string;
                return (
                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100 border border-gray-200">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={row.original.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-xs text-gray-500">
                                -
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Title & Name",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium"> {row.original.title} {row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                return (
                    <Badge
                        variant={
                            type === "specialist" ? "default" : "secondary"
                        }
                    >
                        {type === "specialist" ? "Specialis" : "Umum"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "specialist",
            header: "Specialis",
            cell: ({ row }) => {
                const specialist = row.original.specialist;
                return specialist ? (
                    <div className="text-sm">{specialist.name}</div>
                ) : (
                    <div className="text-xs text-muted-foreground">-</div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const doctor = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/doctor/${doctor.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(doctor.id)}
                            description={`This will permanently delete Dr. ${doctor.name}.`}
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
