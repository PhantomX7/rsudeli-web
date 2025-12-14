"use server";

import { revalidateTag } from "next/cache";
import type { Specialist } from "@/types/specialist";
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

export async function getPaginatedSpecialistsAction(
    params: PaginationParams
): Promise<ActionResponse<Specialist[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Specialist[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.SPECIALIST.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated specialists");
    }
}

export async function getAllSpecialistsAction(): Promise<ActionResponse<Specialist[]>> {
    try {
        // Often needed for dropdown selection in the Doctor form
        const response = await adminApiClient().get<ApiResponse<Specialist[]>>(
            ADMIN_API_ENDPOINTS.SPECIALIST.GENERAL + "?limit=100" 
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch specialists");
    }
}

export async function getSpecialistAction(
    id: number
): Promise<ActionResponse<Specialist>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Specialist>>(
            ADMIN_API_ENDPOINTS.SPECIALIST.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch specialist");
    }
}

export async function createSpecialistAction(
    // Simple JSON object is usually enough for specialists, but using 
    // FormData to match your requested style consistency
    specialistData: FormData | { name: string } 
): Promise<ActionResponse<Specialist>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Specialist>>(
            ADMIN_API_ENDPOINTS.SPECIALIST.GENERAL,
            specialistData
        );
        revalidateTag("specialists", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create specialist");
    }
}

export async function updateSpecialistAction(
    id: number,
    specialistData: FormData | { name: string }
): Promise<ActionResponse<Specialist>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Specialist>>(
            ADMIN_API_ENDPOINTS.SPECIALIST.DETAIL(id),
            specialistData
        );
        revalidateTag("specialists", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update specialist");
    }
}

export async function deleteSpecialistAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.SPECIALIST.DETAIL(id));
        revalidateTag("specialists", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete specialist");
    }
}