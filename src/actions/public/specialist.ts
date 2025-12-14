// actions/public/specialist.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { extractApiData, handleApiError } from "@/lib/helpers";
import type { ActionResponse, ApiResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import type { Specialist } from "@/types/specialist";

/**
 * Get paginated specialists for public pages
 */
export async function getPublicPaginatedSpecialistsAction(
    params: PaginationParams
): Promise<ActionResponse<Specialist[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            sort: "name asc",
            limit: "100",
        };

        const response = await publicApiClient().get<ApiResponse<Specialist[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.SPECIALIST.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["specialists"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated specialists");
    }
}
