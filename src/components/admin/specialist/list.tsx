"use client";

import { createSpecialistColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedSpecialists, useSpecialistMutations } from "@/hooks/admin/use-specialists";

const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        field: "created_at",
        label: "Created Date",
        type: "DATE",
        operators: ["eq", "between"],
    },
];

const SORT_FIELDS: SortFieldConfig[] = [
    { field: "name", label: "Name", allowed: true },
    { field: "created_at", label: "Created Date", allowed: true },
];

interface SpecialistListProps {
    params: PaginationParams;
}

export function SpecialistList({ params }: SpecialistListProps) {
    const queryClient = useQueryClient();
    const { data: specialists, isLoading, error } = usePaginatedSpecialists(params);
    const { deleteMutation } = useSpecialistMutations();

    const columns = createSpecialistColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={specialists?.data || []}
            meta={specialists?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["specialists"] })}
            globalSearchField="name"
            globalSearchPlaceholder="Search specialists..."
        />
    );
}