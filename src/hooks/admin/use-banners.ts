// hooks/admin/use-banners.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getBannerAction,
    deleteBannerAction,
    createBannerAction,
    updateBannerAction,
    getPaginatedBannersAction,
} from "@/actions/admin/banner";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["banners"] as const;

// Individual banner query
export function useBanner(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getBannerAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Paginated banners query
export function usePaginatedBanners(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedBannersAction(params)),
        staleTime: 60 * 1000, // 1 minute
    });
}

// Separated mutations hook
export function useBannerMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ 
            queryKey: QUERY_KEY,
        });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) => 
            handleActionResult(createBannerAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Banner created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateBannerAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Banner updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => 
            handleActionResult(deleteBannerAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Banner deleted successfully");
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