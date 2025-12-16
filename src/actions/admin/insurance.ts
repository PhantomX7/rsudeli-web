// actions/admin/insurance.ts
"use server";

import { revalidateTag } from "next/cache";
import type { Insurance } from "@/types/insurance";
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

export async function getPaginatedInsurancesAction(
    params: PaginationParams
): Promise<ActionResponse<Insurance[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Insurance[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.INSURANCE.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated insurances");
    }
}

export async function getInsuranceAction(
    id: number
): Promise<ActionResponse<Insurance>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Insurance>>(
            ADMIN_API_ENDPOINTS.INSURANCE.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch insurance");
    }
}

export async function createInsuranceAction(
    insuranceData: FormData
): Promise<ActionResponse<Insurance>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Insurance>>(
            ADMIN_API_ENDPOINTS.INSURANCE.GENERAL,
            insuranceData
        );
        revalidateTag("insurances", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create insurance");
    }
}

export async function updateInsuranceAction(
    id: number,
    insuranceData: FormData
): Promise<ActionResponse<Insurance>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Insurance>>(
            ADMIN_API_ENDPOINTS.INSURANCE.DETAIL(id),
            insuranceData
        );
        revalidateTag("insurances", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update insurance");
    }
}

export async function deleteInsuranceAction(
    id: number
): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.INSURANCE.DETAIL(id));
        revalidateTag("insurances", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete insurance");
    }
}