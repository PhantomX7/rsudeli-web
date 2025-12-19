// hooks/admin/use-posts.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getPostAction,
    deletePostAction,
    createPostAction,
    updatePostAction,
    getPaginatedPostsAction,
} from "@/actions/admin/post";
import { handleActionResult } from "@/lib/helpers";
import type { PaginationParams } from "@/types/pagination";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["posts"] as const;

// Individual post query
export function usePost(id: number) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: async () => {
            const result = await handleActionResult(getPostAction(id));
            return result.data;
        },
        enabled: !!id,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Paginated posts query
export function usePaginatedPosts(params: PaginationParams) {
    return useQuery({
        queryKey: [...QUERY_KEY, "paginated", params],
        queryFn: () => handleActionResult(getPaginatedPostsAction(params)),
        staleTime: 60 * 1000, // 1 minute
    });
}

// Separated mutations hook
export function usePostMutations() {
    const queryClient = useQueryClient();

    const invalidateAll = () => {
        queryClient.invalidateQueries({
            queryKey: QUERY_KEY,
        });
    };

    const createMutation = useMutation({
        mutationFn: (data: FormData) =>
            handleActionResult(createPostAction(data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Post created successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) =>
            handleActionResult(updatePostAction(id, data)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Post updated successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            handleActionResult(deletePostAction(id)),
        onSuccess: () => {
            invalidateAll();
            toast.success("Post deleted successfully");
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