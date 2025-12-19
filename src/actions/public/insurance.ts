// actions/public/insurance.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { extractApiData, handleApiError } from "@/lib/helpers";
import type { ActionResponse, ApiResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import type { Insurance } from "@/types/insurance";

/**
 * Get paginated insurances for public pages
 */
export async function getPublicPaginatedInsurancesAction(
    params: PaginationParams = {}
): Promise<ActionResponse<Insurance[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            limit: "100",
            sort: "name asc",
        };

        const response = await publicApiClient().get<ApiResponse<Insurance[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.INSURANCE.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["insurances"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated insurances");
    }
}