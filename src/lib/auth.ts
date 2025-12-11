import { cookies } from "next/headers";
import { AUTH_COOKIES, COOKIE_OPTIONS, type AuthScope } from "@/lib/constants";
import type { AuthTokens } from "@/types/auth";

const getKeys = (scope: AuthScope) => {
    return scope === "admin" ? AUTH_COOKIES.ADMIN : AUTH_COOKIES.PUBLIC;
};

export async function getAccessToken(
    scope: AuthScope = "admin"
): Promise<string | undefined> {
    const cookieStore = await cookies();
    const keys = getKeys(scope);
    return cookieStore.get(keys.ACCESS_TOKEN)?.value;
}

export async function getRefreshToken(
    scope: AuthScope = "admin"
): Promise<string | undefined> {
    const cookieStore = await cookies();
    const keys = getKeys(scope);
    return cookieStore.get(keys.REFRESH_TOKEN)?.value;
}

export async function getAuthTokens(
    scope: AuthScope = "admin"
): Promise<AuthTokens | undefined> {
    const accessToken = await getAccessToken(scope);
    const refreshToken = await getRefreshToken(scope);

    if (!accessToken || !refreshToken) return undefined;

    return { access_token: accessToken, refresh_token: refreshToken };
}

export async function setAuthTokens(
    scope: AuthScope,
    tokens: AuthTokens
): Promise<void> {
    const cookieStore = await cookies();
    const keys = getKeys(scope);

    cookieStore.set(keys.ACCESS_TOKEN, tokens.access_token, COOKIE_OPTIONS);
    cookieStore.set(keys.REFRESH_TOKEN, tokens.refresh_token, COOKIE_OPTIONS);
}

export async function clearAuthTokens(scope: AuthScope): Promise<void> {
    const cookieStore = await cookies();
    const keys = getKeys(scope);
    cookieStore.delete(keys.ACCESS_TOKEN);
    cookieStore.delete(keys.REFRESH_TOKEN);
}
