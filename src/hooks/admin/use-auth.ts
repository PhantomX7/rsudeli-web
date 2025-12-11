// hooks/admin/use-auth.ts
"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/stores/admin-auth-store"; // <--- Admin Store
import {
    loginAction,
    logoutAction,
    getMeAction,
    changePasswordAction,
} from "@/actions/admin/auth";
import { handleActionResult } from "@/lib/helpers";
import type { LoginCredentials, ChangePasswordData } from "@/types/auth";
import type { ApiError } from "@/types/common";

// Unique key for Admin to prevent caching collisions
const ADMIN_QUERY_KEY = ["admin-me"] as const;

export function useAdminAuth() {
    const { user: storeUser, setUser, logout } = useAdminAuthStore();

    const { data, isLoading } = useQuery({
        queryKey: ADMIN_QUERY_KEY,
        queryFn: async () => {
            const response = await getMeAction();
            if (!response.success) return null;
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        placeholderData: storeUser ?? undefined,
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        } else if (data === null && !isLoading) {
            logout();
        }
    }, [data, isLoading, setUser, logout]);

    return {
        user: data ?? storeUser,
        isAuthenticated: !!(data ?? storeUser),
        isLoading,
    };
}

export function useAdminLogin() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setUser = useAdminAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            handleActionResult(loginAction(credentials)),
        onSuccess: async () => {
            try {
                const user = await queryClient.fetchQuery({
                    queryKey: ADMIN_QUERY_KEY,
                    queryFn: async () => {
                        const res = await getMeAction();
                        return res.data;
                    },
                    staleTime: 0,
                });

                if (user) {
                    // Extra safety: Check role
                    if (!["admin", "root", "writer"].includes(user.role)) {
                        toast.error("Unauthorized access");
                        logoutAction();
                        return;
                    }

                    setUser(user);
                    toast.success("Login successful!");
                    router.push("/admin"); // <--- Admin Redirect
                }
            } catch (error) {
                console.error("Failed to fetch user after login", error);
            }
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
}

export function useAdminLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { logout: clearAuth } = useAdminAuthStore();

    return useMutation({
        mutationFn: logoutAction,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ADMIN_QUERY_KEY });
        },
        onSuccess: () => {
            queryClient.setQueryData(ADMIN_QUERY_KEY, null);
            clearAuth();
            toast.success("Logged out successfully");
            router.replace("/admin/login");
        },
        onError: () => {
            queryClient.setQueryData(ADMIN_QUERY_KEY, null);
            clearAuth();
            router.replace("/admin/login");
        },
    });
}

export function useAdminChangePassword() {
    return useMutation({
        mutationFn: (passwordData: ChangePasswordData) =>
            handleActionResult(changePasswordAction(passwordData)),
        onSuccess: () => {
            toast.success("Password changed successfully");
        },
        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
}
