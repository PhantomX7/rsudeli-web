"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getDoctorAction,
    deleteDoctorAction,
    createDoctorAction,
    updateDoctorAction,
    getPaginatedDoctorsAction,
} from "@/actions/admin/doctor";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["doctors"] as const;

// Individual doctor query
export function useDoctor(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getDoctorAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
}

// Paginated doctors query
export function usePaginatedDoctors(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedDoctorsAction(params)),
        staleTime: 60 * 1000,
    });
}

// Separated mutations hook
export function useDoctorMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) =>
            handleActionResult(createDoctorAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Doctor created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateDoctorAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Doctor updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => handleActionResult(deleteDoctorAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Doctor deleted successfully");
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
