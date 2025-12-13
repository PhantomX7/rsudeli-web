// actions/public/banner.ts
"use server";

import type { Banner } from "@/types/banner";
import type { ApiResponse, ActionResponse } from "@/types/common";
import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import type { PaginationParams } from "@/types/pagination";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { handleApiError, extractApiData } from "@/lib/helpers";

export async function getPublicBannersAction(
    ...keys: string[]
): Promise<ActionResponse<Banner[]>> {
    try {
        const keyParam = keys.length > 0 ? `in:${keys.join(",")}` : "";

        const params: PaginationParams = {
            sort: "display_order asc",
            is_active: "true",
            key: keyParam,
        };

        const response = await publicApiClient().get<ApiResponse<Banner[]>>(
            buildBackendUrl(PUBLIC_API_ENDPOINTS.BANNER.GENERAL, params),
            {
                next: { tags: ["banners"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch banners");
    }
}
