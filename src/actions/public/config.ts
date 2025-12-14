// actions/public/config.ts
"use server";

import type { Config } from "@/types/config";
import type { ApiResponse, ActionResponse } from "@/types/common";
import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { handleApiError, extractApiData } from "@/lib/helpers";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";

/**
 * Fetch a specific public configuration by its key.
 */
export async function getPublicConfigByKeyAction(
    key: string
): Promise<ActionResponse<Config>> {
    try {
        const response = await publicApiClient().get<ApiResponse<Config>>(
            PUBLIC_API_ENDPOINTS.CONFIG.FIND_BY_KEY(key),
            {
                next: { tags: ["configs"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, `Failed to fetch config with key: ${key}`);
    }
}

/**
 * Fetch public configurations.
 * If keys are provided, it filters by those keys.
 * If no keys are provided, it fetches all public configs.
 */
export async function getPublicConfigsAction(
    ...keys: string[]
): Promise<ActionResponse<Config[]>> {
    try {
        const queryParams: Record<string, string> = {};

        // If keys are provided, filter by them (e.g., ?key=in:site_name,contact_email)
        if (keys.length > 0) {
            queryParams.key = `in:${keys.join(",")}`;
        }

        const response = await publicApiClient().get<ApiResponse<Config[]>>(
            buildBackendUrl(PUBLIC_API_ENDPOINTS.CONFIG.GENERAL, queryParams),
            {
                next: { tags: ["configs"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch public configs");
    }
}
