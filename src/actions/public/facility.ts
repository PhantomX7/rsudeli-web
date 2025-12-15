// actions/public/facilitie.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { extractApiData, handleApiError } from "@/lib/helpers";
import type { ActionResponse, ApiResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import type { Facility } from "@/types/facility";

/**
 * Get paginated facilities for public pages
 */
export async function getPublicPaginatedFacilitiesAction(
    params: PaginationParams
): Promise<ActionResponse<Facility[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            limit: "100",
            is_active: "true",
            sort: "display_order asc",
        };

        const response = await publicApiClient().get<ApiResponse<Facility[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.FACILITY.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["facilities"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated facilities");
    }
}
