// hooks/admin/use-specialists.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getSpecialistAction,
    deleteSpecialistAction,
    createSpecialistAction,
    updateSpecialistAction,
    getPaginatedSpecialistsAction,
} from "@/actions/admin/specialist";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["specialists"] as const;

// Individual specialist query
export function useSpecialist(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getSpecialistAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

// Paginated specialists query
export function usePaginatedSpecialists(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () =>
            handleActionResult(getPaginatedSpecialistsAction(params)),
        staleTime: 60 * 1000,
    });
}

// Search specialists query (Replaces useAllSpecialists)
export function useSearchSpecialists(search: string, enabled: boolean = true) {
    return useQuery({
        queryKey: [...QUERY_KEY, "search", search],
        queryFn: () => {
            const params: PaginationParams = {
                limit: "10", // Limit results for dropdown efficiency
                ...(search && { name: `like:${search}` }),
            };
            return handleActionResult(getPaginatedSpecialistsAction(params));
        },
        enabled: enabled,
        staleTime: 30 * 1000, // 30 seconds
    });
}

// Separated mutations hook
export function useSpecialistMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) =>
            handleActionResult(createSpecialistAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Specialist created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateSpecialistAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Specialist updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            handleActionResult(deleteSpecialistAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Specialist deleted successfully");
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
