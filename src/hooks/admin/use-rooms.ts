// hooks/admin/use-rooms.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getRoomAction,
    deleteRoomAction,
    createRoomAction,
    updateRoomAction,
    getPaginatedRoomsAction,
} from "@/actions/admin/room";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["rooms"] as const;

// Individual room query
export function useRoom(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getRoomAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Paginated rooms query
export function usePaginatedRooms(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedRoomsAction(params)),
        staleTime: 60 * 1000, // 1 minute
    });
}

// Separated mutations hook
export function useRoomMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({ 
            queryKey: QUERY_KEY,
        });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) => 
            handleActionResult(createRoomAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Room created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updateRoomAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Room updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => 
            handleActionResult(deleteRoomAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Room deleted successfully");
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