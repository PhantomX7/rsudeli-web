// stores/auth-store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types/auth";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAdminAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,

                setUser: (user) =>
                    set(
                        { user, isAuthenticated: !!user },
                        false,
                        "auth/setUser"
                    ),

                logout: () =>
                    set(
                        { user: null, isAuthenticated: false },
                        false,
                        "auth/logout"
                    ),
            }),
            {
                name: "auth-storage",
                partialize: (state) => ({ user: state.user }), // Only persist user
            }
        ),
        {
            name: "AuthStore",
            enabled: process.env.NODE_ENV === "development",
        }
    )
);

// Selectors
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;