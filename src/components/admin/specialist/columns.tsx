"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { Specialist } from "@/types/specialist";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";

interface SpecialistColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createSpecialistColumns({
    onDelete,
    isDeletePending = false,
}: SpecialistColumnsProps): ColumnDef<Specialist>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
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
                const specialist = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/specialist/${specialist.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(specialist.id)}
                            description={`This will permanently delete "${specialist.name}".`}
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
