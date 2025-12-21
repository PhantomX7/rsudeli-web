// components/public/doctor/doctor-filter-bar.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter, Stethoscope, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCallback, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

interface DoctorFilterBarProps {
    totalCount: number;
    specialists?: { id: number; name: string }[];
    showTypeFilter?: boolean;
}

export function DoctorFilterBar({
    totalCount,
    specialists = [],
    showTypeFilter = false,
}: DoctorFilterBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // 1. Initial State
    const getInitialSearchValue = () => {
        const nameParam = searchParams.get("name");
        return nameParam?.startsWith("like:") ? nameParam.slice(5) : "";
    };

    const [searchValue, setSearchValue] = useState(getInitialSearchValue);

    // 2. URL Logic
    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(
                searchParams.toString()
            );

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === "" || value === "all") {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            });

            return newSearchParams.toString();
        },
        [searchParams]
    );

    const navigateWithParams = useCallback(
        (params: Record<string, string | null>) => {
            startTransition(() => {
                const queryString = createQueryString(params);
                router.push(
                    `${pathname}${queryString ? `?${queryString}` : ""}`,
                    {
                        scroll: false,
                    }
                );
            });
        },
        [createQueryString, pathname, router]
    );

    const handleSearch = useDebouncedCallback((value: string) => {
        navigateWithParams({
            name: value ? `like:${value}` : null,
            page: "1",
        });
    }, 300);

    // Clear search helper
    const clearSearch = () => {
        setSearchValue("");
        handleSearch("");
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-xl shadow-gray-200/50 md:flex-row md:items-center">
            {/* --- 1. SEARCH INPUT (Polished) --- */}
            <div className="relative w-full md:w-1/3 group">
                {/* Left Icon */}
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#32c69a]">
                    <Search className="h-5 w-5" />
                </div>

                <Input
                    placeholder="Cari nama dokter..."
                    className={cn(
                        "h-12 w-full rounded-lg border-gray-200 pl-11 pr-10 text-sm transition-all duration-200",
                        "bg-gray-50/50 hover:bg-white hover:border-gray-300",
                        "focus:bg-white focus:border-[#32c69a] focus:ring-4 focus:ring-[#32c69a]/10"
                    )}
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />

                {/* Clear Button (Only shows when typing) */}
                {searchValue && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* --- 2. SPECIALIST FILTER (Aligned Height) --- */}
            {specialists.length > 0 && (
                <div className="w-full md:w-1/3">
                    <Select
                        value={searchParams.get("specialist_id") || "all"}
                        onValueChange={(val) =>
                            navigateWithParams({
                                specialist_id: val,
                                page: "1",
                            })
                        }
                    >
                        <SelectTrigger className="relative h-12 w-full border-gray-200 bg-gray-50/50 pl-11 text-sm text-gray-600 hover:bg-white hover:border-gray-300 focus:border-[#32c69a] focus:ring-4 focus:ring-[#32c69a]/10">
                            {/* Absolute Icon inside Trigger for perfect alignment */}
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <Filter className="h-5 w-5" />
                            </div>
                            <SelectValue className="py-2" placeholder="Pilih Spesialisasi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                value="all"
                                className="text-gray-500 font-medium"
                            >
                                Semua Spesialisasi
                            </SelectItem>
                            {specialists.map((specialist) => (
                                <SelectItem
                                    key={specialist.id}
                                    value={specialist.id.toString()}
                                >
                                    {specialist.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* --- 3. TYPE FILTER (Aligned Height) --- */}
            {showTypeFilter && (
                <div className="w-full md:w-1/4">
                    <Select
                        value={searchParams.get("type") || "all"}
                        onValueChange={(val) =>
                            navigateWithParams({ type: val, page: "1" })
                        }
                    >
                        <SelectTrigger className="relative h-12 w-full border-gray-200 bg-gray-50/50 pl-11 text-sm text-gray-600 hover:bg-white hover:border-gray-300 focus:border-[#32c69a] focus:ring-4 focus:ring-[#32c69a]/10">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                {searchParams.get("type") === "specialist" ? (
                                    <Stethoscope className="h-5 w-5 text-[#32c69a]" />
                                ) : searchParams.get("type") === "general" ? (
                                    <Users className="h-5 w-5 text-blue-500" />
                                ) : (
                                    <Stethoscope className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            <SelectValue placeholder="Tipe Dokter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tipe</SelectItem>
                            <SelectItem value="general">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                    Dokter Umum
                                </div>
                            </SelectItem>
                            <SelectItem value="specialist">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#32c69a]" />
                                    Dokter Spesialis
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* --- 4. COUNTER --- */}
            <div className="hidden md:flex flex-col items-end md:ml-auto min-w-fit">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Total Hasil
                </span>
                <div className="flex items-center gap-2">
                    {isPending && (
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-200 border-t-[#32c69a]" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                        <span className="font-bold text-[#32c69a] text-lg">
                            {totalCount}
                        </span>{" "}
                        Dokter
                    </span>
                </div>
            </div>
        </div>
    );
}
