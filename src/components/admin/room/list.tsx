// app/admin/room/list.tsx
"use client";

import { createRoomColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedRooms, useRoomMutations } from "@/hooks/admin/use-rooms";

const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        field: "type",
        label: "Type",
        type: "ENUM",
        operators: ["eq"],
        options: [
            { value: "adult", label: "Dewasa" },
            { value: "child", label: "Anak" },
        ],
        placeholder: "Select type",
    },
    {
        field: "created_at",
        label: "Created Date",
        type: "DATE",
        operators: ["eq", "between"],
    },
];

const SORT_FIELDS: SortFieldConfig[] = [
    { field: "display_order", label: "Display Order", allowed: true },
    { field: "name", label: "Name", allowed: true },
    { field: "price", label: "Price", allowed: true },
    { field: "type", label: "Type", allowed: true },
    { field: "created_at", label: "Created Date", allowed: true },
];

interface RoomListProps {
    params: PaginationParams;
}

export function RoomList({ params }: RoomListProps) {
    const queryClient = useQueryClient();
    const { data: rooms, isLoading, error } = usePaginatedRooms(params);
    const { deleteMutation } = useRoomMutations();

    const columns = createRoomColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={rooms?.data || []}
            meta={rooms?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["rooms"] })}
            globalSearchField="name"
            globalSearchPlaceholder="Search by name"
        />
    );
}