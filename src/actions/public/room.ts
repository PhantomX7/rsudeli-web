// actions/public/room.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { extractApiData, handleApiError } from "@/lib/helpers";
import type { ActionResponse, ApiResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import type { Room } from "@/types/room";

/**
 * Get paginated rooms for public pages
 */
export async function getPublicPaginatedRoomsAction(
    params: PaginationParams
): Promise<ActionResponse<Room[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            limit: params.limit,
        };

        const response = await publicApiClient().get<ApiResponse<Room[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.ROOM.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["rooms"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated rooms");
    }
}