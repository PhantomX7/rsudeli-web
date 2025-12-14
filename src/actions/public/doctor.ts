// actions/public/doctor.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { extractApiData, handleApiError } from "@/lib/helpers";
import type { ActionResponse, ApiResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import type { Doctor } from "@/types/doctor";

/**
 * Get paginated doctors for public pages
 */
export async function getPublicPaginatedDoctorsAction(
    params: PaginationParams
): Promise<ActionResponse<Doctor[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            sort: "name asc",
            limit: "100",
        };

        const response = await publicApiClient().get<ApiResponse<Doctor[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.DOCTOR.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["doctors"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated doctors");
    }
}

/**
 * Get single doctor by ID for public pages
 */
export async function getPublicDoctorAction(
    id: number
): Promise<ActionResponse<Doctor>> {
    try {
        const response = await publicApiClient().get<ApiResponse<Doctor>>(
            `${PUBLIC_API_ENDPOINTS.DOCTOR.GENERAL}/${id}`,
            {
                next: { tags: ["doctors"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch doctor");
    }
}

/**
 * Get doctors by specialist ID for public pages
 */
export async function getPublicDoctorsBySpecialistAction(
    specialistId: number,
    params?: PaginationParams
): Promise<ActionResponse<Doctor[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            sort: "name asc",
            limit: "100",
            specialist_id: String(specialistId),
        };

        const response = await publicApiClient().get<ApiResponse<Doctor[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.DOCTOR.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["doctors"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch doctors by specialist");
    }
}

/**
 * Get doctors by type (general/specialist) for public pages
 */
export async function getPublicDoctorsByTypeAction(
    type: "general" | "specialist",
    params?: PaginationParams
): Promise<ActionResponse<Doctor[]>> {
    try {
        const paramsWithDefaults: PaginationParams = {
            ...params,
            sort: "name asc",
            type,
            limit: "200",
        };

        const response = await publicApiClient().get<ApiResponse<Doctor[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.DOCTOR.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["doctors"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch doctors by type");
    }
}
