"use server";

import { revalidateTag } from "next/cache";
import type { Banner } from "@/types/banner";
import type { ApiResponse, ActionResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import { adminApiClient } from "@/lib/api";
import { ADMIN_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import {
    handleApiError,
    extractApiData,
    handleApiSuccess,
} from "@/lib/helpers";

export async function getPaginatedBannersAction(
    params: PaginationParams
): Promise<ActionResponse<Banner[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Banner[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.BANNER.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated banners");
    }
}

export async function getBannerAction(
    id: number
): Promise<ActionResponse<Banner>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Banner>>(
            ADMIN_API_ENDPOINTS.BANNER.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch banner");
    }
}

export async function createBannerAction(
    bannerData: FormData
): Promise<ActionResponse<Banner>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Banner>>(
            ADMIN_API_ENDPOINTS.BANNER.GENERAL,
            bannerData
        );
        revalidateTag("banners", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create banner");
    }
}

export async function updateBannerAction(
    id: number,
    bannerData: FormData
): Promise<ActionResponse<Banner>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Banner>>(
            ADMIN_API_ENDPOINTS.BANNER.DETAIL(id),
            bannerData
        );
        revalidateTag("banners", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update banner");
    }
}

export async function deleteBannerAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.BANNER.DETAIL(id));
        revalidateTag("banners", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete banner");
    }
}
