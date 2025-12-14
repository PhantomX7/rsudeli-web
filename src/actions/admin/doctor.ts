"use server";

import { revalidateTag } from "next/cache";
import type { Doctor } from "@/types/doctor";
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

export async function getPaginatedDoctorsAction(
    params: PaginationParams
): Promise<ActionResponse<Doctor[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Doctor[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.DOCTOR.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated doctors");
    }
}

export async function getDoctorAction(
    id: number
): Promise<ActionResponse<Doctor>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Doctor>>(
            ADMIN_API_ENDPOINTS.DOCTOR.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch doctor");
    }
}

export async function createDoctorAction(
    doctorData: FormData
): Promise<ActionResponse<Doctor>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Doctor>>(
            ADMIN_API_ENDPOINTS.DOCTOR.GENERAL,
            doctorData
        );
        revalidateTag("doctors", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create doctor");
    }
}

export async function updateDoctorAction(
    id: number,
    doctorData: FormData
): Promise<ActionResponse<Doctor>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Doctor>>(
            ADMIN_API_ENDPOINTS.DOCTOR.DETAIL(id),
            doctorData
        );
        revalidateTag("doctors", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update doctor");
    }
}

export async function deleteDoctorAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.DOCTOR.DETAIL(id));
        revalidateTag("doctors", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete doctor");
    }
}