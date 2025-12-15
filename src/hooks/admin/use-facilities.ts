// hooks/admin/use-facilities.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getFacilityAction,
    deleteFacilityAction,
    createFacilityAction,
    updateFacilityAction,
    getPaginatedFacilitiesAction,
} from "@/actions/admin/facility";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["facilities"] as const;

// Individual facility query
export function useFacility(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getFacilityAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Paginated facilities query
export function usePaginatedFacilities(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedFacilitiesAction(params)),
        staleTime: 60 * 1000, // 1 minute
    });
}

// Separated mutations hook
export function useFacilityMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ 
            queryKey: QUERY_KEY,
        });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) => 
            handleActionResult(createFacilityAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Facility created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateFacilityAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Facility updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => 
            handleActionResult(deleteFacilityAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Facility deleted successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
    };
}