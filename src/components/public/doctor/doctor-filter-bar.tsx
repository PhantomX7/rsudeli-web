// components/public/doctor/doctor-filter-bar.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

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

    // Extract initial search value from "name=like:value" format
    const getInitialSearchValue = () => {
        const nameParam = searchParams.get("name");
        if (nameParam?.startsWith("like:")) {
            return nameParam.slice(5); // Remove "like:" prefix
        }
        return "";
    };

    const [searchValue, setSearchValue] = useState(getInitialSearchValue);

    const createQueryString = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(
                searchParams.toString()
            );

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === "") {
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
                    `${pathname}${queryString ? `?${queryString}` : ""}`
                );
            });
        },
        [createQueryString, pathname, router]
    );

    // Search with "name=like:value" format
    const handleSearch = useDebouncedCallback((value: string) => {
        navigateWithParams({
            name: value ? `like:${value}` : null,
        });
    }, 300);

    // Type filter with "type=value" format
    const handleTypeChange = (value: string) => {
        navigateWithParams({ type: value || null });
    };

    // Specialist filter with "specialist_id=value" format
    const handleSpecialistChange = (value: string) => {
        navigateWithParams({ specialist_id: value || null });
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-xl md:flex-row md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Cari nama dokter..."
                    className="h-11 border-gray-200 pl-10 focus:border-[#32c69a] focus:ring-[#32c69a]"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
            </div>

            {/* Specialist Filter */}
            {specialists.length > 0 && (
                <div className="relative w-full md:w-1/3">
                    <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <select
                        className="h-11 w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm focus:border-[#32c69a] focus:outline-none focus:ring-2 focus:ring-[#32c69a]/20"
                        value={searchParams.get("specialist_id") || ""}
                        onChange={(e) => handleSpecialistChange(e.target.value)}
                    >
                        <option value="">Semua Spesialisasi</option>
                        {specialists.map((specialist) => (
                            <option key={specialist.id} value={specialist.id}>
                                {specialist.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Type Filter */}
            {showTypeFilter && (
                <div className="relative w-full md:w-1/4">
                    <select
                        className="h-11 w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-4 text-sm focus:border-[#32c69a] focus:outline-none focus:ring-2 focus:ring-[#32c69a]/20"
                        value={searchParams.get("type") || ""}
                        onChange={(e) => handleTypeChange(e.target.value)}
                    >
                        <option value="">Semua Tipe</option>
                        <option value="general">Dokter Umum</option>
                        <option value="specialist">Dokter Spesialis</option>
                    </select>
                </div>
            )}

            {/* Count */}
            <div className="w-full md:ml-auto md:w-auto">
                <span className="text-sm font-medium text-gray-500">
                    Menampilkan{" "}
                    <span className="font-bold text-[#32c69a]">
                        {totalCount}
                    </span>{" "}
                    Dokter
                </span>
                {isPending && (
                    <span className="ml-2 text-xs text-gray-400">
                        Loading...
                    </span>
                )}
            </div>
        </div>
    );
}
