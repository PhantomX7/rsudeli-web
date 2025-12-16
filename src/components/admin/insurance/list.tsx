// app/admin/insurance/list.tsx
"use client";

import { createInsuranceColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import {
    FilterFieldConfig,
    SortFieldConfig,
    PaginationParams,
} from "@/types/pagination";
import {
    usePaginatedInsurances,
    useInsuranceMutations,
} from "@/hooks/admin/use-insurances";

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

interface InsuranceListProps {
    params: PaginationParams;
}

export function InsuranceList({ params }: InsuranceListProps) {
    const queryClient = useQueryClient();
    const {
        data: insurances,
        isLoading,
        error,
    } = usePaginatedInsurances(params);
    const { deleteMutation } = useInsuranceMutations();

    const columns = createInsuranceColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={insurances?.data || []}
            meta={insurances?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() =>
                queryClient.invalidateQueries({ queryKey: ["insurances"] })
            }
            globalSearchField="name"
            globalSearchPlaceholder="Search by insurance name"
        />
    );
}
