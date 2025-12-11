// src/lib/constants.ts

import type { UserRole } from "@/types/user";

export const API_BASE_URL =
    process.env.API_BASE_URL || "https://api.example.com";

export const BANNER_KEY = {
    HOME: "home",
};

export const ADMIN_API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        ME: "/auth/me",
        CHANGE_PASSWORD: "/auth/change-password",
        LOGOUT: "/auth/logout",
    },
    BANNER: {
        GENERAL: "/admin/banner",
        DETAIL: (id: number) => `/admin/banner/${id}`,
    },
    BLOG: {
        GENERAL: "/admin/blog",
        DETAIL: (id: number) => `/admin/blog/${id}`,
    },
    BRAND: {
        GENERAL: "/admin/brand",
        DETAIL: (id: number) => `/admin/brand/${id}`,
    },
    CATEGORY: {
        GENERAL: "/admin/category",
        DETAIL: (id: number) => `/admin/category/${id}`,
    },
    CONFIG: {
        GENERAL: "/admin/config",
        DETAIL: (id: number) => `/admin/config/${id}`,
        FIND_BY_KEY: (key: string) => `/admin/config/key/${key}`,
    },
    PRODUCT: {
        GENERAL: "/admin/product",
        DETAIL: (id: number) => `/admin/product/${id}`,
        EXPORT: "/admin/product/export",
        EXPORT_ALL: "/admin/product/export/all",
        IMPORT: "/admin/product/import",
        IMPORT_VALIDATE: "/admin/product/import/validate",
    },
    SPEC_DEFINITION: {
        GENERAL: "/admin/spec-definition",
        DETAIL: (id: number) => `/admin/spec-definition/${id}`,
    },
    STATISTIC: {
        GENERAL: "/admin/statistic",
    },
    USER: {
        GENERAL: "/admin/user",
        DETAIL: (id: number) => `/admin/user/${id}`,
    },
    MEDIA: {
        UPLOAD: "/admin/media/upload",
    },
} as const;

export const PUBLIC_API_ENDPOINTS = {
    BANNER: {
        GENERAL: "/public/banner",
    },
    BLOG: {
        GENERAL: "/public/blog",
        DETAIL: (slug: string) => `/public/blog/${slug}`,
    },
    CONFIG: {
        GENERAL: "/public/config",
        FIND_BY_KEY: (key: string) => `/public/config/key/${key}`,
    },
} as const;

export const TOKEN_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
} as const;

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

// Define distinct keys for each scope
export const AUTH_COOKIES = {
    ADMIN: {
        ACCESS_TOKEN: "admin_access_token",
        REFRESH_TOKEN: "admin_refresh_token",
    },
    PUBLIC: {
        ACCESS_TOKEN: "public_access_token",
        REFRESH_TOKEN: "public_refresh_token",
    },
} as const;

export type AuthScope = "admin" | "public";

export const roleColors: Record<
    UserRole,
    "default" | "secondary" | "destructive" | "outline"
> = {
    admin: "destructive",
    root: "default",
};
