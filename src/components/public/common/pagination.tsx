"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export interface PaginationMeta {
    total: number;
    limit: number;
    offset: number;
}

interface PaginationProps {
    meta: PaginationMeta;
}

export function Pagination({ meta }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Calculate current page and total pages from meta
    const currentPage = Math.floor(meta.offset / meta.limit) + 1;
    const totalPages = Math.ceil(meta.total / meta.limit);

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        // Use 'page' parameter instead of 'offset'
        params.set("page", pageNumber.toString());
        params.set("limit", meta.limit.toString());
        return `${pathname}?${params.toString()}`;
    };

    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;

    const getPageNumbers = (): number[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, 5];
        }

        if (currentPage >= totalPages - 2) {
            return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
        }

        return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
    };

    const pageNumbers = getPageNumbers();

    // Don't render pagination if there's only one page or no data
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex px-2 md:px-12 justify-center items-center gap-2">
            {/* First Page */}
            {hasPrev ? (
                <Link
                    href={createPageURL(1)}
                    scroll={false}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/5 transition-colors"
                    aria-label="Go to first page"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </Link>
            ) : (
                <div
                    className="flex items-center justify-center h-9 w-9"
                    aria-hidden="true"
                >
                    <ChevronsLeft className="w-4 h-4 opacity-50" />
                </div>
            )}

            {/* Previous Page */}
            {hasPrev ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    scroll={false}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/5 transition-colors"
                    aria-label="Go to previous page"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Link>
            ) : (
                <div
                    className="flex items-center justify-center h-9 w-9"
                    aria-hidden="true"
                >
                    <ChevronLeft className="w-4 h-4 opacity-50" />
                </div>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page) => (
                    <Link
                        key={page}
                        href={createPageURL(page)}
                        className={
                            page === currentPage
                                ? "font-bold flex justify-center items-center border rounded-full h-9 w-9 bg-white/5"
                                : "flex justify-center items-center h-9 w-9 rounded-full text-[#A0A0AB] hover:bg-white/5 transition-colors"
                        }
                        scroll={false}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        <span>{page}</span>
                    </Link>
                ))}
            </div>

            {/* Next Page */}
            {hasNext ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    scroll={false}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/5 transition-colors"
                    aria-label="Go to next page"
                >
                    <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <div
                    className="flex items-center justify-center h-9 w-9"
                    aria-hidden="true"
                >
                    <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
            )}

            {/* Last Page */}
            {hasNext ? (
                <Link
                    href={createPageURL(totalPages)}
                    scroll={false}
                    className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/5 transition-colors"
                    aria-label="Go to last page"
                >
                    <ChevronsRight className="w-4 h-4" />
                </Link>
            ) : (
                <div
                    className="flex items-center justify-center h-9 w-9"
                    aria-hidden="true"
                >
                    <ChevronsRight className="w-4 h-4 opacity-50" />
                </div>
            )}
        </div>
    );
}
