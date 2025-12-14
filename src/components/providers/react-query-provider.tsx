// providers/react-query-provider.tsx
"use client";

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ErrorTypes, type ApiErrorDetails } from "@/lib/helpers";

function handleGlobalError(error: unknown) {
    const err = error as ApiErrorDetails | undefined;

    if (
        err?.type === ErrorTypes.CONNECTION_ERROR ||
        err?.type === ErrorTypes.SERVER_ERROR
    ) {
        const handler = (window as any)?.__setConnectionError;
        if (typeof handler === "function") {
            handler(err.message, err.type);
        }
    }
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                retry: (failureCount, error) => {
                    const err = error as ApiErrorDetails | undefined;

                    // No retry for auth/forbidden/not-found
                    if (
                        err?.type === ErrorTypes.NOT_AUTHENTICATED ||
                        err?.type === ErrorTypes.FORBIDDEN ||
                        err?.type === ErrorTypes.NOT_FOUND
                    ) {
                        return false;
                    }

                    // Retry connection errors up to 2 times
                    if (err?.type === ErrorTypes.CONNECTION_ERROR) {
                        return failureCount < 2;
                    }

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

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    }
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
}

export default function ReactQueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
