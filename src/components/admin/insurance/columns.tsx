// app/admin/insurance/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { Insurance } from "@/types/insurance";
import Link from "next/link";
import { ConfirmButton } from "@/components/common/confirm-button";
import { formatDateTimeValue } from "@/lib/format";

interface InsuranceColumnsProps {
    onDelete: (id: number) => void;
    isDeletePending?: boolean;
}

export function createInsuranceColumns({
    onDelete,
    isDeletePending = false,
}: InsuranceColumnsProps): ColumnDef<Insurance>[] {
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
                const insurance = row.original;

                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/insurance/${insurance.id}`}>
                                Edit
                            </Link>
                        </Button>
                        <ConfirmButton
                            onConfirm={() => onDelete(insurance.id)}
                            description={`This will permanently delete the insurance "${insurance.name}".`}
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