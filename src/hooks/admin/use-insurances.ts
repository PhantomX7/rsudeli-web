// hooks/admin/use-insurances.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getInsuranceAction,
    deleteInsuranceAction,
    createInsuranceAction,
    updateInsuranceAction,
    getPaginatedInsurancesAction,
} from "@/actions/admin/insurance";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["insurances"] as const;

// Individual insurance query
export function useInsurance(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getInsuranceAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Paginated insurances query
export function usePaginatedInsurances(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedInsurancesAction(params)),
        staleTime: 60 * 1000, // 1 minute
    });
}

// Separated mutations hook
export function useInsuranceMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({
            queryKey: QUERY_KEY,
        });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) =>
            handleActionResult(createInsuranceAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Insurance created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateInsuranceAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Insurance updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            handleActionResult(deleteInsuranceAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Insurance deleted successfully");
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