// app/admin/facility/list.tsx
"use client";

import { createFacilityColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedFacilities, useFacilityMutations } from "@/hooks/admin/use-facilities";

const FILTER_FIELDS: FilterFieldConfig[] = [
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
    { field: "created_at", label: "Created Date", allowed: true },
];

interface FacilityListProps {
    params: PaginationParams;
}

export function FacilityList({ params }: FacilityListProps) {
    const queryClient = useQueryClient();
    const { data: facilities, isLoading, error } = usePaginatedFacilities(params);
    const { deleteMutation } = useFacilityMutations();

    const columns = createFacilityColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={facilities?.data || []}
            meta={facilities?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["facilities"] })}
            globalSearchField="name"
            globalSearchPlaceholder="Search by name"
        />
    );
}