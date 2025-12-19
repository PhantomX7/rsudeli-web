// app/admin/post/list.tsx
"use client";

import { createPostColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedPosts, usePostMutations } from "@/hooks/admin/use-posts";

const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        field: "created_at",
        label: "Created Date",
        type: "DATE",
        operators: ["eq", "between"],
    },
    {
        field: "type",
        label: "Type",
        type: "ENUM",
        options: [
            { label: "Kegiatan", value: "umum" },
            { label: "Akreditasi", value: "akreditasi" },
            { label: "Artikel", value: "artikel" },
        ],
        operators: ["eq"],
    },
];

const SORT_FIELDS: SortFieldConfig[] = [
    { field: "title", label: "Title", allowed: true },
    { field: "created_at", label: "Created Date", allowed: true },
    { field: "type", label: "Type", allowed: true },
];

interface PostListProps {
    params: PaginationParams;
}

export function PostList({ params }: PostListProps) {
    const queryClient = useQueryClient();
    const { data: posts, isLoading, error } = usePaginatedPosts(params);
    const { deleteMutation } = usePostMutations();

    const columns = createPostColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={posts?.data || []}
            meta={posts?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
            globalSearchField="title"
            globalSearchPlaceholder="Search by title"
        />
    );
}