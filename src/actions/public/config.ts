// actions/public/config.ts
"use server";

import type { Config } from "@/types/config";
import type { ApiResponse, ActionResponse } from "@/types/common";
import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { handleApiError, extractApiData } from "@/lib/helpers";

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
