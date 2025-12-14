// providers/react-query-provider.tsx
"use client";

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ErrorTypes, type ApiErrorDetails } from "@/lib/helpers";

/**
 * Handles global errors and triggers connection error banner/toast
 */
function handleGlobalError(error: unknown) {
    const err = error as ApiErrorDetails | undefined;

    // Only trigger global handler for connection/server errors
    if (
        err?.type === ErrorTypes.CONNECTION_ERROR ||
        err?.type === ErrorTypes.SERVER_ERROR
    ) {
        if (typeof window !== "undefined") {
            const setConnectionError = (window as any).__setConnectionError;
            if (setConnectionError && typeof setConnectionError === "function") {
                setConnectionError(err.message, err.type);
            }
        }
    }
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                retry: (failureCount, error) => {
                    const err = error as ApiErrorDetails | undefined;

                    // Don't retry on auth errors
                    if (err?.type === ErrorTypes.NOT_AUTHENTICATED) {
                        return false;
                    }

                    // Don't retry on forbidden/not found
                    if (
                        err?.type === ErrorTypes.FORBIDDEN ||
                        err?.type === ErrorTypes.NOT_FOUND
                    ) {
                        return false;
                    }

                    // Retry connection errors up to 2 times
                    if (err?.type === ErrorTypes.CONNECTION_ERROR) {
                        return failureCount < 2;
                    }

                    // Default: retry once
                    return failureCount < 1;
                },
                retryDelay: (attemptIndex) =>
                    Math.min(1000 * 2 ** attemptIndex, 5000),
            },
            mutations: {
                retry: false,
                onError: handleGlobalError,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

interface ReactQueryProviderProps {
    children: React.ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}