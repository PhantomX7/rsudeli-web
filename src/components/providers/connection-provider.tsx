// providers/connection-provider.tsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { WifiOff, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorTypes, type ErrorType } from "@/lib/helpers";

interface ConnectionContextType {
    isOffline: boolean;
    error: string | null;
    errorType: ErrorType | null;
    retry: () => void;
    dismiss: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

export function useConnection() {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnection must be used within ConnectionProvider");
    }
    return context;
}

interface ConnectionProviderProps {
    children: ReactNode;
}

export function ConnectionProvider({ children }: ConnectionProviderProps) {
    const queryClient = useQueryClient();
    const [isOffline, setIsOffline] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorType, setErrorType] = useState<ErrorType | null>(null);

    // Listen for online/offline events
    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
            setError(null);
            setErrorType(null);
            // Refetch failed queries when back online
            queryClient.invalidateQueries();
        };

        const handleOffline = () => {
            setIsOffline(true);
            setError("You are offline. Please check your internet connection.");
            setErrorType(ErrorTypes.CONNECTION_ERROR);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Check initial state
        if (!navigator.onLine) {
            handleOffline();
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [queryClient]);

    // Set error from outside (called by QueryClient global error handler)
    const setConnectionError = useCallback((message: string, type: ErrorType) => {
        setError(message);
        setErrorType(type);
        setIsOffline(type === ErrorTypes.CONNECTION_ERROR);
    }, []);

    // Expose setConnectionError globally for QueryClient
    useEffect(() => {
        (window as any).__setConnectionError = setConnectionError;
        return () => {
            delete (window as any).__setConnectionError;
        };
    }, [setConnectionError]);

    const retry = useCallback(() => {
        setError(null);
        setErrorType(null);
        setIsOffline(false);
        queryClient.invalidateQueries();
    }, [queryClient]);

    const dismiss = useCallback(() => {
        setError(null);
        setErrorType(null);
    }, []);

    return (
        <ConnectionContext.Provider
            value={{ isOffline, error, errorType, retry, dismiss }}
        >
            {children}
            {error && <ConnectionErrorBanner />}
        </ConnectionContext.Provider>
    );
}

function ConnectionErrorBanner() {
    const { error, errorType, retry, dismiss } = useConnection();

    const isConnectionError = errorType === ErrorTypes.CONNECTION_ERROR;
    const isServerError = errorType === ErrorTypes.SERVER_ERROR;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
            <div
                className={`mx-auto max-w-2xl p-4 ${
                    isConnectionError
                        ? "bg-orange-500"
                        : isServerError
                          ? "bg-red-500"
                          : "bg-destructive"
                }`}
            >
                <div className="flex items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-3">
                        <WifiOff className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={retry}
                            className="h-8"
                        >
                            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                            Retry
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={dismiss}
                            className="h-8 w-8 p-0 hover:bg-white/20"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}