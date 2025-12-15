// actions/admin/facility.ts
"use server";

import { revalidateTag } from "next/cache";
import type { Facility } from "@/types/facility";
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

export async function getPaginatedFacilitiesAction(
    params: PaginationParams
): Promise<ActionResponse<Facility[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Facility[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.FACILITY.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated facilities");
    }
}

export async function getFacilityAction(
    id: number
): Promise<ActionResponse<Facility>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Facility>>(
            ADMIN_API_ENDPOINTS.FACILITY.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch facility");
    }
}

export async function createFacilityAction(
    facilityData: FormData
): Promise<ActionResponse<Facility>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Facility>>(
            ADMIN_API_ENDPOINTS.FACILITY.GENERAL,
            facilityData
        );
        revalidateTag("facilities", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create facility");
    }
}

export async function updateFacilityAction(
    id: number,
    facilityData: FormData
): Promise<ActionResponse<Facility>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Facility>>(
            ADMIN_API_ENDPOINTS.FACILITY.DETAIL(id),
            facilityData
        );
        revalidateTag("facilities", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update facility");
    }
}

export async function deleteFacilityAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.FACILITY.DETAIL(id));
        revalidateTag("facilities", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete facility");
    }
}