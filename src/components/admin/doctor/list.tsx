// @/components/admin/doctor/list.tsx
"use client";

import { createDoctorColumns } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { FilterableDataTable } from "@/components/data-table/filterable-data-table";
import { FilterFieldConfig, SortFieldConfig, PaginationParams } from "@/types/pagination";
import { usePaginatedDoctors, useDoctorMutations } from "@/hooks/admin/use-doctors";
import { useSearchSpecialists, useSpecialist } from "@/hooks/admin/use-specialists";

const FILTER_FIELDS: FilterFieldConfig[] = [
    {
        field: "type",
        label: "Type",
        type: "ENUM",
        operators: ["eq"],
        options: [
            { value: "specialist", label: "Specialist" },
            { value: "general", label: "General Practitioner" },
        ],
    },
    // Added Specialist Filter
    {
        field: "specialist_id",
        label: "Specialist",
        type: "ID",
        operators: ["eq"],
        placeholder: "Search specialist...",
        useSearchHook: useSearchSpecialists,
        useSingleItemHook: useSpecialist,
    },
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

interface DoctorListProps {
    params: PaginationParams;
}

export function DoctorList({ params }: DoctorListProps) {
    const queryClient = useQueryClient();
    const { data: doctors, isLoading, error } = usePaginatedDoctors(params);
    const { deleteMutation } = useDoctorMutations();

    const columns = createDoctorColumns({
        onDelete: (id: number) => deleteMutation.mutate(id),
        isDeletePending: deleteMutation.isPending,
    });

    return (
        <FilterableDataTable
            data={doctors?.data || []}
            meta={doctors?.meta || null}
            isLoading={isLoading}
            error={error}
            columns={columns}
            filterFields={FILTER_FIELDS}
            sortFields={SORT_FIELDS}
            onRefresh={() => queryClient.invalidateQueries({ queryKey: ["doctors"] })}
            globalSearchField="name"
            globalSearchPlaceholder="Search doctors by name..."
        />
    );
}