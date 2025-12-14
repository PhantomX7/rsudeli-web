// hooks/admin/use-auth.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    loginAction,
    logoutAction,
    getMeAction,
    changePasswordAction,
} from "@/actions/admin/auth";
import {
    handleActionResult,
    getErrorType,
    getErrorMessage,
    ErrorTypes,
} from "@/lib/helpers";
import type { LoginCredentials, ChangePasswordData } from "@/types/auth";
import type { ApiError } from "@/types/common";

const QUERY_KEY = ["admin", "user"] as const;

export type AuthStatus =
    | "loading"
    | "authenticated"
    | "unauthenticated"
    | "error";

/**
 * Main auth query - React Query is the single source of truth
 */
export function useAdminAuth() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: getMeAction,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    // Determine auth status based on response
    let status: AuthStatus = "loading";
    let errorMessage: string | null = null;

    if (isLoading) {
        status = "loading";
    } else if (data?.success && data?.data) {
        status = "authenticated";
    } else if (data) {
        const errorType = getErrorType(data);

        if (errorType === ErrorTypes.NOT_AUTHENTICATED) {
            status = "unauthenticated";
        } else if (errorType === ErrorTypes.CONNECTION_ERROR) {
            status = "error";
            errorMessage = getErrorMessage(data);
        } else {
            status = "error";
            errorMessage = getErrorMessage(data);
        }
    }

    return {
        user: data?.data ?? null,
        status,
        error: errorMessage,
        isLoading,
        isAuthenticated: status === "authenticated",
        isError: status === "error",
        refetch,
    };
}

/**
 * Separated auth mutations hook
 */
export function useAdminAuthMutations() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const invalidateAuth = () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    };

    const clearAuth = () => {
        queryClient.removeQueries({ queryKey: QUERY_KEY });
    };

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            handleActionResult(loginAction(credentials)),
        onSuccess: async () => {
            await invalidateAuth();
            toast.success("Login successful!");
            router.push("/admin");
        },
        onError: (error: ApiError) => {
            toast.error(error.message || "Login failed");
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutAction,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });
            queryClient.setQueryData(QUERY_KEY, { success: false, data: null });
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
        },
        onSettled: () => {
            clearAuth();
            router.replace("/admin/login");
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (data: ChangePasswordData) =>
            handleActionResult(changePasswordAction(data)),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message || "Password change failed");
        },
    });

    return {
        loginMutation,
        logoutMutation,
        changePasswordMutation,
    };
}
