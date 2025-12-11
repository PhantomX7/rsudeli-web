"use client";

import { createBannerColumns } from "./columns";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedBanners, useBannerMutations } from "@/hooks/admin/use-banners";

const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        field: "is_active",
        label: "Status",
        type: "BOOL",
        operators: ["eq"],
        options: [
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
        ],
    },
    {
        field: "key",
        label: "Key",
        type: "ENUM",
        operators: ["eq"],
        options: [
            { value: "home", label: "Home" },
            { value: "category", label: "Category" },
        ],
        placeholder: "Select key",
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
    { field: "created_at", label: "Created Date", allowed: true },
];

interface BannerListProps {
    params: PaginationParams;
}

export function BannerList({ params }: BannerListProps) {
    const queryClient = useQueryClient();
    const { data: banners, isLoading, error } = usePaginatedBanners(params);
    const { deleteMutation } = useBannerMutations();

    const columns = useMemo(
        () => createBannerColumns({
            onDelete: (id: number) => deleteMutation.mutate(id),
            isDeletePending: deleteMutation.isPending,
        }),
        [deleteMutation.isPending, deleteMutation.mutate]
    );

    return (
        <FilterableDataTable
            data={banners?.data || []}
            meta={banners?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["banners"] })}
            globalSearchField="name"
            globalSearchPlaceholder="Search by name"
        />
    );
}