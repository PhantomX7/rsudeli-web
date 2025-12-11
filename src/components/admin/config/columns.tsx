// @/components/admin/config/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useState } from "react";
import type { Config } from "@/types/config";

interface CreateConfigColumnsProps {
    onUpdate: (id: number, value: string) => void;
    isUpdatePending: boolean;
}

export function createConfigColumns({
    onUpdate,
    isUpdatePending,
}: CreateConfigColumnsProps): ColumnDef<Config>[] {
    return [
        {
            accessorKey: "key",
            header: "Key",
            cell: ({ row }) => (
                <div className="font-medium">
                    <Badge variant="outline">{row.getValue("key")}</Badge>
                </div>
            ),
        },
        {
            accessorKey: "value",
            header: "Value",
            cell: ({ row }) => {
                const [isEditing, setIsEditing] = useState(false);
                const [value, setValue] = useState(
                    row.getValue("value") as string
                );

                if (isEditing) {
                    return (
                        <div className="flex items-center gap-2">
                            <Input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="max-w-[300px]"
                                autoFocus
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    onUpdate(row.original.id, value);
                                    setIsEditing(false);
                                }}
                                disabled={isUpdatePending}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setValue(row.getValue("value") as string);
                                    setIsEditing(false);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                }

                return (
                    <div
                        className="max-w-[300px] cursor-pointer hover:bg-accent/50 rounded px-2 py-1"
                        onClick={() => setIsEditing(true)}
                    >
                        {row.getValue("value") || (
                            <span className="text-muted-foreground">
                                Click to edit
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];
}
