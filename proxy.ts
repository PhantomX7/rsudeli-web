// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/lib/constants";

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl; // Use 'search' for the full query string (?a=b)

    // The Matcher below prevents this function from running on those files anyway.

    // =========================================================
    // ADMIN AUTHENTICATION LOGIC
    // =========================================================
    if (pathname.startsWith("/admin")) {
        const hasAdminToken = request.cookies.has(
            AUTH_COOKIES.ADMIN.ACCESS_TOKEN
        );
        const isAdminLoginPage = pathname === "/admin/login";

        // Case A: Admin is logged in, trying to access login page -> Redirect to Dashboard
        if (isAdminLoginPage && hasAdminToken) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        // Case B: Admin is NOT logged in, trying to access protected admin page -> Redirect to Login
        if (!isAdminLoginPage && !hasAdminToken) {
            const loginUrl = new URL("/admin/login", request.url);
            
            // Original code result: "/admin/userssort=asc" (Missing ?)
            // New code result: "/admin/users?sort=asc"
            loginUrl.searchParams.set("from", pathname + search);
            
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    // =========================================================
    // PUBLIC AUTHENTICATION LOGIC
    // =========================================================
    const hasPublicToken = request.cookies.has(
        AUTH_COOKIES.PUBLIC.ACCESS_TOKEN
    );
    const isPublicLoginPage = pathname === "/login" || pathname === "/register";
    const isProtectedPublicRoute =
        pathname.startsWith("/profile") || pathname.startsWith("/account");

    // Case C: Customer is logged in, trying to access login/register -> Redirect to Home
    if (isPublicLoginPage && hasPublicToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Case D: Customer is NOT logged in, trying to access protected page -> Redirect to Login
    if (isProtectedPublicRoute && !hasPublicToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname + search);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // This matcher is correct. It handles the exclusions for you.
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};